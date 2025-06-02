"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { AddToCartSchema, UpdateCartSchema } from "@/schema"
import { revalidatePath } from "next/cache"

// Add item to cart
export async function addToCart(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  const rawData = {
    productId: formData.get("productId") as string,
    quantity: parseInt(formData.get("quantity") as string) || 1,
  }

  // Validate input
  const validatedFields = AddToCartSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { productId, quantity } = validatedFields.data

  try {
    // Check if product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, stock: true, sellerId: true }
    })

    if (!product) {
      return { error: "Produk tidak ditemukan" }
    }

    // Prevent seller from adding their own product to cart
    if (product.sellerId === session.user.id) {
      return { error: "Anda tidak dapat menambahkan produk sendiri ke keranjang" }
    }

    if (product.stock < quantity) {
      return { error: "Stok produk tidak mencukupi" }
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
        productId: productId
      }
    })

    if (existingCartItem) {
      // Update quantity if item already exists
      const newQuantity = existingCartItem.quantity + quantity
      
      if (newQuantity > product.stock) {
        return { error: "Total quantity melebihi stok yang tersedia" }
      }

      await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity }
      })
    } else {
      // Create new cart item
      await prisma.cart.create({
        data: {
          userId: session.user.id,
          productId,
          quantity
        }
      })
    }

    revalidatePath("/cart")
    return { success: "Produk berhasil ditambahkan ke keranjang" }
  } catch (error) {
    console.error("Add to cart error:", error)
    return { error: "Gagal menambahkan produk ke keranjang" }
  }
}

// Update cart item quantity
export async function updateCartItem(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  const rawData = {
    cartId: formData.get("cartId") as string,
    quantity: parseInt(formData.get("quantity") as string),
  }

  // Validate input
  const validatedFields = UpdateCartSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { cartId, quantity } = validatedFields.data

  try {
    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cart.findFirst({
      where: {
        id: cartId,
        userId: session.user.id
      },
      include: {
        product: {
          select: { stock: true }
        }
      }
    })

    if (!cartItem) {
      return { error: "Item keranjang tidak ditemukan" }
    }

    if (quantity > cartItem.product.stock) {
      return { error: "Quantity melebihi stok yang tersedia" }
    }

    await prisma.cart.update({
      where: { id: cartId },
      data: { quantity }
    })

    revalidatePath("/cart")
    return { success: "Keranjang berhasil diperbarui" }
  } catch (error) {
    console.error("Update cart error:", error)
    return { error: "Gagal memperbarui keranjang" }
  }
}

// Remove item from cart
export async function removeFromCart(cartId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  try {
    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cart.findFirst({
      where: {
        id: cartId,
        userId: session.user.id
      }
    })

    if (!cartItem) {
      return { error: "Item keranjang tidak ditemukan" }
    }

    await prisma.cart.delete({
      where: { id: cartId }
    })

    revalidatePath("/cart")
    return { success: "Item berhasil dihapus dari keranjang" }
  } catch (error) {
    console.error("Remove from cart error:", error)
    return { error: "Gagal menghapus item dari keranjang" }
  }
}

// Get user's cart
export async function getUserCart() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            stock: true,
            seller: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return cartItems
  } catch (error) {
    console.error("Get user cart error:", error)
    return []
  }
}

// Clear user's cart
export async function clearCart() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  try {
    await prisma.cart.deleteMany({
      where: { userId: session.user.id }
    })

    revalidatePath("/cart")
    return { success: "Keranjang berhasil dikosongkan" }
  } catch (error) {
    console.error("Clear cart error:", error)
    return { error: "Gagal mengosongkan keranjang" }
  }
}

// Get cart item count
export async function getCartItemCount() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return 0
  }

  try {
    const count = await prisma.cart.count({
      where: { userId: session.user.id }
    })

    return count
  } catch (error) {
    console.error("Get cart count error:", error)
    return 0
  }
}