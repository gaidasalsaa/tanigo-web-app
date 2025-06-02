import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Target, Heart, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Memberdayakan Petani",
      description: "Memberikan akses pasar yang lebih luas untuk petani dan pengrajin lokal",
    },
    {
      icon: Target,
      title: "Kualitas Terjamin",
      description: "Produk berkualitas tinggi langsung dari sumber terpercaya",
    },
    {
      icon: Heart,
      title: "Mendukung Ekonomi Lokal",
      description: "Setiap pembelian berkontribusi pada pertumbuhan ekonomi Ngrayun",
    },
  ]

  const team = [
    {
      name: "Pak Slamet",
      role: "Petani Beras Organik",
      image: "/placeholder.svg?height=150&width=150",
      description: "Berpengalaman 20 tahun dalam pertanian organik",
    },
    {
      name: "Bu Sari",
      role: "Pengrajin Bambu",
      image: "/placeholder.svg?height=150&width=150",
      description: "Ahli kerajinan bambu turun temurun",
    },
    {
      name: "Pak Budi",
      role: "Petani Jagung",
      image: "/placeholder.svg?height=150&width=150",
      description: "Spesialis jagung manis berkualitas tinggi",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">TaniGo</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Beranda
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Produk
            </Link>
            <Link href="/about" className="text-green-600 font-medium">
              Tentang Kami
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Masuk</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800">Tentang TaniGo</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Menghubungkan Ngrayun dengan Dunia</h1>
            <p className="text-xl text-gray-600 mb-8">
              TaniGo adalah platform digital yang menghubungkan petani dan pengrajin Ngrayun, Ponorogo dengan pasar yang
              lebih luas, mendukung pemberdayaan ekonomi lokal melalui teknologi.
            </p>
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
              <Badge className="mb-4 bg-green-100 text-green-800">Ngrayun, Ponorogo</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Daerah Agraris dengan Potensi Luar Biasa</h2>
              <p className="text-gray-600 mb-6">
                Ngrayun adalah sebuah kecamatan di Kabupaten Ponorogo, Jawa Timur, yang dikenal sebagai daerah agraris
                dengan mayoritas penduduk bermata pencaharian sebagai petani dan pengrajin. Wilayah ini memiliki tanah
                yang subur dan tradisi kerajinan yang turun temurun.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span>Terletak di Kabupaten Ponorogo, Jawa Timur</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-3" />
                  <span>Fokus pada pertanian organik dan berkelanjutan</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-3" />
                  <span>Lebih dari 500 petani dan pengrajin aktif</span>
                </div>
              </div>
              <p className="text-gray-600">
                Namun, keterbatasan akses pasar dan minimnya pemanfaatan teknologi digital membuat produk-produk
                berkualitas dari Ngrayun belum dapat menjangkau pasar yang lebih luas. TaniGo hadir sebagai solusi untuk
                mengatasi tantangan ini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi & Misi TaniGo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Komitmen kami untuk memberdayakan petani dan pengrajin Ngrayun
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-green-600">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Menjadi platform digital terdepan yang menghubungkan hasil bumi dan kerajinan Ngrayun dengan pasar
                  nasional, serta menjadi katalisator pemberdayaan ekonomi lokal melalui teknologi digital.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-green-600">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• Memperluas akses pasar untuk petani dan pengrajin Ngrayun</li>
                  <li>• Meningkatkan pendapatan melalui sistem transaksi yang efisien</li>
                  <li>• Memberikan pelatihan teknologi digital kepada masyarakat</li>
                  <li>• Melestarikan produk lokal dan kerajinan tradisional</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih TaniGo?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform yang dirancang khusus untuk mendukung petani dan pengrajin lokal
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Petani & Pengrajin Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan beberapa petani dan pengrajin terbaik yang bergabung dengan TaniGo
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4"
                  />
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-green-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ada pertanyaan atau ingin bergabung? Jangan ragu untuk menghubungi tim TaniGo
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle>Telepon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">+62 812-3456-7890</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">info@tanigo.com</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle>Alamat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ngrayun, Ponorogo
                  <br />
                  Jawa Timur
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
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
                <ArrowRight className="ml-2 h-5 w-5" />
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
    </div>
  )
}
