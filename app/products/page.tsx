"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Search, ShoppingCart, Star, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const products = [
    {
      id: 1,
      name: "Beras Organik Ngrayun",
      price: 15000,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      category: "hasil-bumi",
      rating: 4.8,
      seller: "Pak Slamet",
      location: "Ngrayun Timur",
      description: "Beras organik berkualitas tinggi tanpa pestisida",
      stock: 50,
    },
    {
      id: 2,
      name: "Kerajinan Bambu Tempat Pensil",
      price: 75000,
      unit: "pcs",
      image: "/placeholder.svg?height=200&width=200",
      category: "kerajinan",
      rating: 4.9,
      seller: "Bu Sari",
      location: "Ngrayun Barat",
      description: "Tempat pensil dari bambu dengan ukiran tradisional",
      stock: 25,
    },
    {
      id: 3,
      name: "Jagung Manis Segar",
      price: 8000,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      category: "hasil-bumi",
      rating: 4.7,
      seller: "Pak Budi",
      location: "Ngrayun Selatan",
      description: "Jagung manis segar dipetik langsung dari kebun",
      stock: 100,
    },
    {
      id: 4,
      name: "Anyaman Pandan Tas",
      price: 45000,
      unit: "pcs",
      image: "/placeholder.svg?height=200&width=200",
      category: "kerajinan",
      rating: 4.6,
      seller: "Bu Ningsih",
      location: "Ngrayun Utara",
      description: "Tas anyaman pandan dengan motif tradisional",
      stock: 15,
    },
    {
      id: 5,
      name: "Cabai Rawit Merah",
      price: 25000,
      unit: "kg",
      image: "/placeholder.svg?height=200&width=200",
      category: "hasil-bumi",
      rating: 4.5,
      seller: "Pak Joko",
      location: "Ngrayun Tengah",
      description: "Cabai rawit merah segar dengan tingkat kepedasan tinggi",
      stock: 30,
    },
    {
      id: 6,
      name: "Kerajinan Kayu Miniatur",
      price: 120000,
      unit: "pcs",
      image: "/placeholder.svg?height=200&width=200",
      category: "kerajinan",
      rating: 4.8,
      seller: "Pak Agus",
      location: "Ngrayun Timur",
      description: "Miniatur rumah tradisional dari kayu jati",
      stock: 10,
    },
  ]

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "hasil-bumi", label: "Hasil Bumi" },
    { value: "kerajinan", label: "Kerajinan" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Produk TaniGo</h1>
          <p className="text-gray-600">Temukan hasil bumi dan kerajinan terbaik dari Ngrayun, Ponorogo</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cari Produk</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari produk atau penjual..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">Menampilkan {filteredProducts.length} produk</p>
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`group hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
            >
              <CardHeader className={`p-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className={`object-cover group-hover:scale-105 transition-transform ${
                      viewMode === "list" ? "w-full h-32" : "w-full h-48"
                    }`}
                  />
                  <Badge className="absolute top-2 left-2 bg-green-600">
                    {product.category === "hasil-bumi" ? "Hasil Bumi" : "Kerajinan"}
                  </Badge>
                  {product.stock < 20 && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Stok Terbatas
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <CardDescription className="mb-2">
                  Oleh: {product.seller} • {product.location}
                </CardDescription>
                {viewMode === "list" && <p className="text-sm text-gray-600 mb-2">{product.description}</p>}
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-400 ml-2">• Stok: {product.stock}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
                    <span className="text-sm text-gray-500">/{product.unit}</span>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Beli
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
            <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
