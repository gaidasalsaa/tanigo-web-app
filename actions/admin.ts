"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { UpdateUserSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { Role } from "@prisma/client"

// Check if user is admin
async function checkAdminAccess() {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Anda harus login terlebih dahulu")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (user?.role !== Role.ADMIN) {
    throw new Error("Anda tidak memiliki akses admin")
  }

  return session.user.id
}

// Get all users (admin only)
export async function getAllUsers(page = 1, limit = 20, search = "") {
  try {
    await checkAdminAccess()
    
    const skip = (page - 1) * limit
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } }
      ]
    } : {}

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          city: true,
          createdAt: true,
          _count: {
            select: {
              products: true,
              orders: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.user.count({ where })
    ])

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error("Get all users error:", error)
    return {
      users: [],
      pagination: { total: 0, page: 1, limit, totalPages: 0 }
    }
  }
}

// Update user role (admin only)
export async function updateUserRole(userId: string, role: Role) {
  try {
    await checkAdminAccess()

    if (!Object.values(Role).includes(role)) {
      return { error: "Role tidak valid" }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role }
    })

    revalidatePath("/admin/users")
    return { success: "Role pengguna berhasil diperbarui" }
  } catch (error) {
    console.error("Update user role error:", error)
    return { error: error instanceof Error ? error.message : "Gagal memperbarui role pengguna" }
  }
}

// Delete user (admin only)
export async function deleteUser(userId: string) {
  try {
    const adminId = await checkAdminAccess()

    // Prevent admin from deleting themselves
    if (userId === adminId) {
      return { error: "Anda tidak dapat menghapus akun sendiri" }
    }

    // Check if user has active orders or products
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            orders: true,
            products: true,
          }
        }
      }
    })

    if (!user) {
      return { error: "Pengguna tidak ditemukan" }
    }

    if (user._count.orders > 0 || user._count.products > 0) {
      return { error: "Tidak dapat menghapus pengguna yang memiliki pesanan atau produk aktif" }
    }

    await prisma.user.delete({
      where: { id: userId }
    })

    revalidatePath("/admin/users")
    return { success: "Pengguna berhasil dihapus" }
  } catch (error) {
    console.error("Delete user error:", error)
    return { error: error instanceof Error ? error.message : "Gagal menghapus pengguna" }
  }
}

// Get admin dashboard statistics
export async function getAdminStatistics() {
  try {
    await checkAdminAccess()

    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      usersByRole,
      recentOrders
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: "SELESAI" }
      }),
      prisma.user.groupBy({
        by: ['role'],
        _count: { role: true }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      })
    ])

    const roleStats = usersByRole.reduce((acc, curr) => {
      acc[curr.role] = curr._count.role
      return acc
    }, {} as Record<Role, number>)

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      usersByRole: roleStats,
      recentOrders
    }
  } catch (error) {
    console.error("Get admin statistics error:", error)
    return null
  }
}

// Get all products (admin only)
export async function getAllProducts(page = 1, limit = 20, search = "") {
  try {
    await checkAdminAccess()
    
    const skip = (page - 1) * limit
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } }
      ]
    } : {}

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          _count: {
            select: {
              orderItems: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.product.count({ where })
    ])

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error("Get all products error:", error)
    return {
      products: [],
      pagination: { total: 0, page: 1, limit, totalPages: 0 }
    }
  }
}

// Get all orders (admin only)
export async function getAllOrders(page = 1, limit = 20, status?: string) {
  try {
    await checkAdminAccess()
    
    const skip = (page - 1) * limit
    
    const where = status ? { status: status as any } : {}

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  seller: {
                    select: {
                      id: true,
                      name: true,
                    }
                  }
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.order.count({ where })
    ])

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error("Get all orders error:", error)
    return {
      orders: [],
      pagination: { total: 0, page: 1, limit, totalPages: 0 }
    }
  }
}