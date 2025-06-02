"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { UpdateOrderStatusSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { OrderStatus, Role } from "@prisma/client"

// Create order from cart
export async function createOrderFromCart() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  try {
    // Get user's cart items
    const cartItems = await prisma.cart.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          }
        }
      }
    })

    if (cartItems.length === 0) {
      return { error: "Keranjang kosong" }
    }

    // Check stock availability
    const stockErrors = []
    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        stockErrors.push(`${item.product.name} stok tidak mencukupi (tersedia: ${item.product.stock})`)
      }
    }

    if (stockErrors.length > 0) {
      return { error: stockErrors.join(", ") }
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          totalAmount,
          status: OrderStatus.BELUM_DIBAYAR,
        }
      })

      // Create order items
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          }
        })

        // Update product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      // Clear user's cart
      await tx.cart.deleteMany({
        where: { userId: session.user.id }
      })

      return newOrder
    })

    revalidatePath("/cart")
    revalidatePath("/orders")
    return { success: "Pesanan berhasil dibuat", orderId: order.id }
  } catch (error) {
    console.error("Create order error:", error)
    return { error: "Gagal membuat pesanan" }
  }
}

// Update order status (untuk seller dan admin)
export async function updateOrderStatus(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  const rawData = {
    orderId: formData.get("orderId") as string,
    status: formData.get("status") as OrderStatus,
  }

  // Validate input
  const validatedFields = UpdateOrderStatusSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { orderId, status } = validatedFields.data

  try {
    // Get order with items to check if user has permission
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: { sellerId: true }
            }
          }
        }
      }
    })

    if (!order) {
      return { error: "Pesanan tidak ditemukan" }
    }

    // Check user permission
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    const isAdmin = user?.role === Role.ADMIN
    const isSeller = order.items.some(item => item.product.sellerId === session.user.id)

    if (!isAdmin && !isSeller) {
      return { error: "Anda tidak memiliki akses untuk mengubah status pesanan ini" }
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status }
    })

    revalidatePath("/orders")
    revalidatePath("/seller/orders")
    return { success: "Status pesanan berhasil diperbarui" }
  } catch (error) {
    console.error("Update order status error:", error)
    return { error: "Gagal memperbarui status pesanan" }
  }
}

// Get user's orders
export async function getUserOrders() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
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
      orderBy: { createdAt: "desc" }
    })

    return orders
  } catch (error) {
    console.error("Get user orders error:", error)
    return []
  }
}

// Get single order
export async function getOrder(orderId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return null
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                seller: {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                  }
                }
              }
            }
          }
        }
      }
    })

    return order
  } catch (error) {
    console.error("Get order error:", error)
    return null
  }
}

// Get seller's orders
export async function getSellerOrders() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  try {
    // Get orders that contain products from this seller
    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              sellerId: session.user.id
            }
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
          }
        },
        items: {
          where: {
            product: {
              sellerId: session.user.id
            }
          },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return orders
  } catch (error) {
    console.error("Get seller orders error:", error)
    return []
  }
}

// Cancel order (only if status is BELUM_DIBAYAR)
export async function cancelOrder(orderId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id
      },
      include: {
        items: true
      }
    })

    if (!order) {
      return { error: "Pesanan tidak ditemukan" }
    }

    if (order.status !== OrderStatus.BELUM_DIBAYAR) {
      return { error: "Pesanan hanya dapat dibatalkan jika belum dibayar" }
    }

    // Restore product stock and delete order
    await prisma.$transaction(async (tx) => {
      // Restore stock
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity
            }
          }
        })
      }

      // Delete order (will cascade delete order items)
      await tx.order.delete({
        where: { id: orderId }
      })
    })

    revalidatePath("/orders")
    return { success: "Pesanan berhasil dibatalkan" }
  } catch (error) {
    console.error("Cancel order error:", error)
    return { error: "Gagal membatalkan pesanan" }
  }
}

// Get order statistics (for admin/seller dashboard)
export async function getOrderStatistics() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    let whereCondition = {}

    // If seller, only show statistics for their products
    if (user?.role === Role.SELLER) {
      whereCondition = {
        items: {
          some: {
            product: {
              sellerId: session.user.id
            }
          }
        }
      }
    }

    const [totalOrders, pendingOrders, completedOrders, totalRevenue] = await Promise.all([
      prisma.order.count({ where: whereCondition }),
      prisma.order.count({ 
        where: { 
          ...whereCondition,
          status: OrderStatus.BELUM_DIBAYAR 
        } 
      }),
      prisma.order.count({ 
        where: { 
          ...whereCondition,
          status: OrderStatus.SELESAI 
        } 
      }),
      prisma.order.aggregate({
        where: {
          ...whereCondition,
          status: OrderStatus.SELESAI
        },
        _sum: {
          totalAmount: true
        }
      })
    ])

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0
    }
  } catch (error) {
    console.error("Get order statistics error:", error)
    return null
  }
}