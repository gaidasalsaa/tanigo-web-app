"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, ShoppingCart, Package, Star, TrendingUp, Bell, Settings, LogOut, Plus, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  const [userType] = useState<"buyer" | "seller">("buyer") 

  const recentOrders = [
    {
      id: "ORD-001",
      product: "Beras Organik Ngrayun",
      seller: "Pak Slamet",
      price: 15000,
      quantity: 2,
      status: "Dikirim",
      date: "2024-01-15",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-002",
      product: "Kerajinan Bambu",
      seller: "Bu Sari",
      price: 75000,
      quantity: 1,
      status: "Dikemas",
      date: "2024-01-14",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const sellerProducts = [
    {
      id: 1,
      name: "Beras Organik Premium",
      price: 18000,
      stock: 45,
      sold: 23,
      rating: 4.8,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
    },
    {
      id: 2,
      name: "Jagung Manis Segar",
      price: 8000,
      stock: 0,
      sold: 67,
      rating: 4.7,
      image: "/placeholder.svg?height=60&width=60",
      status: "out_of_stock",
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dikirim":
        return "bg-blue-100 text-blue-800"
      case "Dikemas":
        return "bg-yellow-100 text-yellow-800"
      case "Selesai":
        return "bg-green-100 text-green-800"
      case "Dibatalkan":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">TaniGo</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard {userType === "buyer" ? "Pembeli" : "Penjual"}
          </h1>
          <p className="text-gray-600">Selamat datang kembali! Kelola aktivitas Anda di TaniGo.</p>
        </div>

        {userType === "buyer" ? (
          // Buyer Dashboard
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Belanja</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(450000)}</div>
                  <p className="text-xs text-muted-foreground">+15% dari bulan lalu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produk Favorit</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Produk dalam wishlist</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Pesanan Terbaru</CardTitle>
                <CardDescription>Pantau status pesanan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={order.image || "/placeholder.svg"}
                        alt={order.product}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{order.product}</h4>
                        <p className="text-sm text-gray-600">Oleh: {order.seller}</p>
                        <p className="text-sm text-gray-500">
                          {order.quantity} x {formatPrice(order.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/orders">
                    <Button variant="outline" className="w-full">
                      Lihat Semua Pesanan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Seller Dashboard
          <div className="space-y-8">
            {/* Seller Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 produk baru</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Penjualan</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(2450000)}</div>
                  <p className="text-xs text-muted-foreground">+20% dari bulan lalu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pesanan</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+12 pesanan baru</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Dari 156 ulasan</p>
                </CardContent>
              </Card>
            </div>

            {/* Seller Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Produk Saya</CardTitle>
                  <CardDescription>Kelola produk yang Anda jual</CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Produk
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellerProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">Stok: {product.stock}</span>
                          <span className="text-sm text-gray-500">Terjual: {product.sold}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-gray-500">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {product.status === "active" ? "Aktif" : "Stok Habis"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Lihat Semua Produk
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
