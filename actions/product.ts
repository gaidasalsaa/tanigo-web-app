"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { CreateProductSchema, UpdateProductSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Role } from "@prisma/client"

// Create product (hanya untuk seller dan admin)
export async function createProduct(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  // Check if user is seller or admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (!user || (user.role !== Role.SELLER && user.role !== Role.ADMIN)) {
    return { error: "Anda tidak memiliki akses untuk menambah produk" }
  }

  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string || undefined,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
    imageUrl: formData.get("imageUrl") as string || undefined,
    sellerId: session.user.id,
  }

  // Validate input
  const validatedFields = CreateProductSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const product = await prisma.product.create({
      data: validatedFields.data
    })

    revalidatePath("/products")
    revalidatePath("/seller/products")
    redirect(`/products/${product.id}`)
  } catch (error) {
    console.error("Create product error:", error)
    return { error: "Gagal menambah produk" }
  }
}

// Update product
export async function updateProduct(productId: string, formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  // Check if product exists and user owns it
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { sellerId: true }
  })

  if (!existingProduct) {
    return { error: "Produk tidak ditemukan" }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  // Only seller who owns the product or admin can update
  if (existingProduct.sellerId !== session.user.id && user?.role !== Role.ADMIN) {
    return { error: "Anda tidak memiliki akses untuk mengubah produk ini" }
  }

  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string || undefined,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
    imageUrl: formData.get("imageUrl") as string || undefined,
  }

  // Validate input
  const validatedFields = UpdateProductSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.product.update({
      where: { id: productId },
      data: validatedFields.data
    })

    revalidatePath("/products")
    revalidatePath("/seller/products")
    revalidatePath(`/products/${productId}`)
    return { success: "Produk berhasil diperbarui" }
  } catch (error) {
    console.error("Update product error:", error)
    return { error: "Gagal memperbarui produk" }
  }
}

// Delete product
export async function deleteProduct(productId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  // Check if product exists and user owns it
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { sellerId: true }
  })

  if (!existingProduct) {
    return { error: "Produk tidak ditemukan" }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  // Only seller who owns the product or admin can delete
  if (existingProduct.sellerId !== session.user.id && user?.role !== Role.ADMIN) {
    return { error: "Anda tidak memiliki akses untuk menghapus produk ini" }
  }

  try {
    await prisma.product.delete({
      where: { id: productId }
    })

    revalidatePath("/products")
    revalidatePath("/seller/products")
    return { success: "Produk berhasil dihapus" }
  } catch (error) {
    console.error("Delete product error:", error)
    return { error: "Gagal menghapus produk" }
  }
}

// Get products with pagination and search
export async function getProducts(page = 1, limit = 12, search = "") {
  try {
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
    console.error("Get products error:", error)
    return {
      products: [],
      pagination: { total: 0, page: 1, limit, totalPages: 0 }
    }
  }
}

// Get single product
export async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            city: true,
          }
        }
      }
    })

    return product
  } catch (error) {
    console.error("Get product error:", error)
    return null
  }
}

// Get seller's products
export async function getSellerProducts() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  try {
    const products = await prisma.product.findMany({
      where: { sellerId: session.user.id },
      orderBy: { createdAt: "desc" }
    })

    return products
  } catch (error) {
    console.error("Get seller products error:", error)
    return []
  }
}