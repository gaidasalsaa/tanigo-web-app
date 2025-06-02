import { z } from "zod"
import { Role, OrderStatus } from "@prisma/client"

// User Schema
export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  phone: z.string().regex(/^[0-9+\-\s]+$/, "Format nomor telepon tidak valid").optional(),
  birthDate: z.date().optional(),
  city: z.string().max(100, "Nama kota maksimal 100 karakter").optional(),
  address: z.string().max(500, "Alamat maksimal 500 karakter").optional(),
  role: z.nativeEnum(Role).default(Role.BUYER),
})

export const UpdateUserSchema = UserSchema.partial().omit({ password: true })

export const CreateUserSchema = UserSchema.omit({ id: true })

// Product Schema
export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama produk wajib diisi").max(200, "Nama produk maksimal 200 karakter"),
  description: z.string().max(1000, "Deskripsi maksimal 1000 karakter").optional(),
  price: z.number().positive("Harga harus lebih dari 0"),
  stock: z.number().int().min(0, "Stok tidak boleh negatif"),
  imageUrl: z.string().url("Format URL gambar tidak valid").optional(),
  sellerId: z.string().min(1, "Seller ID wajib diisi"),
})

export const CreateProductSchema = ProductSchema.omit({ id: true })

export const UpdateProductSchema = ProductSchema.partial().omit({ sellerId: true })

// Cart Schema
export const CartSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, "User ID wajib diisi"),
  productId: z.string().min(1, "Product ID wajib diisi"),
  quantity: z.number().int().positive("Quantity harus lebih dari 0"),
})

export const AddToCartSchema = CartSchema.omit({ id: true, userId: true })

export const UpdateCartSchema = z.object({
  cartId: z.string().min(1, "Cart ID wajib diisi"),
  quantity: z.number().int().positive("Quantity harus lebih dari 0"),
})

// Order Schema
export const OrderSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, "User ID wajib diisi"),
  totalAmount: z.number().positive("Total amount harus lebih dari 0"),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.BELUM_DIBAYAR),
})

export const CreateOrderSchema = OrderSchema.omit({ id: true, userId: true })

export const UpdateOrderStatusSchema = z.object({
  orderId: z.string().min(1, "Order ID wajib diisi"),
  status: z.nativeEnum(OrderStatus),
})

// OrderItem Schema
export const OrderItemSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().min(1, "Order ID wajib diisi"),
  productId: z.string().min(1, "Product ID wajib diisi"),
  quantity: z.number().int().positive("Quantity harus lebih dari 0"),
  price: z.number().positive("Price harus lebih dari 0"),
})

export const CreateOrderItemSchema = OrderItemSchema.omit({ id: true, orderId: true })

// Auth Schemas
export const SignInSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

// Response types
export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>
export type UpdateProduct = z.infer<typeof UpdateProductSchema>
export type Cart = z.infer<typeof CartSchema>
export type AddToCart = z.infer<typeof AddToCartSchema>
export type UpdateCart = z.infer<typeof UpdateCartSchema>
export type Order = z.infer<typeof OrderSchema>
export type CreateOrder = z.infer<typeof CreateOrderSchema>
export type UpdateOrderStatus = z.infer<typeof UpdateOrderStatusSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type CreateOrderItem = z.infer<typeof CreateOrderItemSchema>
export type SignIn = z.infer<typeof SignInSchema>
export type Register = z.infer<typeof RegisterSchema>