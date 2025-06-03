"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { SignIn, SignInSchema } from "@/schema"
import { signInAction } from "@/actions/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router= useRouter()

  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: SignIn) => {
    setIsLoading(true)
    setLoginError("")

    try {
      const res=await signInAction(values)
      if (res.error) {
        setLoginError(res.error)
        return
      }
      toast.success
      (res.success || "Login berhasil")
    } catch (error) {
    setLoginError(
        (error as Error).message || "Terjadi kesalahan saat masuk. Silakan coba lagi."
    )
    } finally {
    setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">TaniGo</span>
          </div>
          <CardTitle className="text-2xl">Masuk ke Akun Anda</CardTitle>
          <CardDescription>Masukkan email dan password untuk mengakses platform TaniGo</CardDescription>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="nama@email.com"
                        {...field}
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          {...field}
                          disabled={isLoading}
                          autoComplete="current-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                  tabIndex={isLoading ? -1 : 0}
                >
                  Lupa password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Masuk...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-green-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                tabIndex={isLoading ? -1 : 0}
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
              tabIndex={isLoading ? -1 : 0}
            >
              Kembali ke beranda
            </Link>
          </div>

          {/* Demo credentials info */}
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-green-600">Email: demo@tanigo.com</p>
            <p className="text-xs text-green-600">Password: password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
