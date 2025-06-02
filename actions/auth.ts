"use server"

import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Register, RegisterSchema, SignIn, SignInSchema, UpdateUserSchema } from "@/schema"
import { hash } from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AuthError } from "next-auth"

// Sign Out Action
export async function signOutAction() {
  try {
    await signOut({ redirectTo: "/signin" })
  } catch (error) {
    console.error("Sign out error:", error)
    return { error: "Gagal logout. Silakan coba lagi." }
  }
}

// Sign In Action
export async function signInAction(formData: SignIn) {
  const validatedFields = SignInSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah" }
        default:
          return { error: "Terjadi kesalahan saat login" }
      }
    }
    throw error
  }
}

// Register Action
export async function registerAction(formData: Register) {
  const validatedFields = RegisterSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "Email sudah terdaftar" }
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "BUYER", // Default role
      }
    })

    return { success: "Pendaftaran berhasil. Silakan login." }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Gagal mendaftar. Silakan coba lagi." }
  }
}

// Update user profile
export async function updateUserProfile(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Anda harus login terlebih dahulu" }
  }

  const rawData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string || undefined,
    city: formData.get("city") as string || undefined,
    address: formData.get("address") as string || undefined,
    birthDate: formData.get("birthDate") ? new Date(formData.get("birthDate") as string) : undefined,
  }

  // Validate input
  const validatedFields = UpdateUserSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: validatedFields.data
    })

    revalidatePath("/profile")
    return { success: "Profile berhasil diperbarui" }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "Gagal memperbarui profile" }
  }
}

// Get current user profile
export async function getCurrentUser() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birthDate: true,
        city: true,
        address: true,
        role: true,
        createdAt: true,
      }
    })

    return user
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}