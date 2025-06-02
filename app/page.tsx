import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, ShoppingCart, Users, Star, ArrowRight, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HeroSection from "@/components/HeroSection"


export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Beras Organik Ngrayun",
      price: "Rp 15.000/kg",
      image: "/placeholder.svg?height=200&width=200",
      category: "Hasil Bumi",
      rating: 4.8,
      seller: "Pak Slamet",
    },
    {
      id: 2,
      name: "Kerajinan Bambu",
      price: "Rp 75.000",
      image: "/placeholder.svg?height=200&width=200",
      category: "Kerajinan",
      rating: 4.9,
      seller: "Bu Sari",
    },
    {
      id: 3,
      name: "Jagung Manis",
      price: "Rp 8.000/kg",
      image: "/placeholder.svg?height=200&width=200",
      category: "Hasil Bumi",
      rating: 4.7,
      seller: "Pak Budi",
    },
    {
      id: 4,
      name: "Anyaman Pandan",
      price: "Rp 45.000",
      image: "/placeholder.svg?height=200&width=200",
      category: "Kerajinan",
      rating: 4.6,
      seller: "Bu Ningsih",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Petani & Pengrajin Terdaftar</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Produk Tersedia</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">Rating Kepuasan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilihan terbaik hasil bumi dan kerajinan dari petani dan pengrajin Ngrayun
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600">{product.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="mb-2">Oleh: {product.seller}</CardDescription>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{product.price}</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="outline" size="lg">
                Lihat Semua Produk
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Ngrayun */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Desa Ngrayun"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">Tentang Ngrayun</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Daerah Agraris dengan Potensi Luar Biasa</h2>
              <p className="text-gray-600 mb-6">
                Ngrayun, Ponorogo, adalah daerah agraris dengan mayoritas penduduk sebagai petani dan pengrajin. Wilayah
                ini memiliki potensi besar dalam menghasilkan produk pertanian berkualitas dan kerajinan tradisional
                yang unik.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span>Ngrayun, Ponorogo, Jawa Timur</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-3" />
                  <span>Fokus pada pertanian organik dan berkelanjutan</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-3" />
                  <span>Memberdayakan petani dan pengrajin lokal</span>
                </div>
              </div>
              <Link href="/about" className="inline-block mt-6">
                <Button variant="outline">
                  Pelajari Lebih Lanjut
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Bergabunglah dengan Komunitas TaniGo</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Mulai jual produk Anda atau temukan hasil bumi dan kerajinan terbaik dari Ngrayun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Daftar Sebagai Penjual
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600"
              >
                Mulai Berbelanja
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">TaniGo</span>
              </div>
              <p className="text-gray-400">
                Platform digital untuk menghubungkan petani dan pengrajin Ngrayun dengan pasar yang lebih luas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products" className="hover:text-white">
                    Produk
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Bantuan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kategori</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products?category=hasil-bumi" className="hover:text-white">
                    Hasil Bumi
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=kerajinan" className="hover:text-white">
                    Kerajinan
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=organik" className="hover:text-white">
                    Produk Organik
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kontak</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@tanigo.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Ngrayun, Ponorogo</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaniGo. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
