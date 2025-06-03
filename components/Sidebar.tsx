"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Menu, ShoppingCart, User, Home, Package, Info, Phone } from "lucide-react"
import LogoutButton from "./LogoutButton"

interface Props {
  session: any
}

const Sidebar = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const isLogin = !!session?.user
  const role = session?.user?.role

  const closeSidebar = () => setIsOpen(false)

  return (
    <div className="md:hidden block">
      {/* Menu Toggle Button */}
      <Button 
        variant="ghost" 
        onClick={() => setIsOpen(true)} 
        className="fixed top-4 right-4 z-50 md:hidden bg-white shadow-md"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="TaniGo Logo" width={60} height={40} />
            <span className="font-semibold text-gray-800">TaniGo</span>
          </div>
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info Section (if logged in) */}
        {isLogin && (
          <div className="px-6 py-4 border-b bg-green-50">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 rounded-full p-2">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-600">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-1">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Navigasi Utama
            </h3>
            
            <Link 
              href="/" 
              onClick={closeSidebar} 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Beranda</span>
            </Link>
            
            <Link 
              href="/products" 
              onClick={closeSidebar} 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Package className="h-4 w-4" />
              <span>Produk</span>
            </Link>
            
            <Link 
              href="/about" 
              onClick={closeSidebar} 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>Tentang Kami</span>
            </Link>
            
            <Link 
              href="/contact" 
              onClick={closeSidebar} 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Kontak</span>
            </Link>
          </div>

          {/* User Menu (if logged in) */}
          {isLogin && (
            <div className="pt-4 mt-4 border-t space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Akun Saya
              </h3>
              
              <Link 
                href="/cart" 
                onClick={closeSidebar} 
                className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Keranjang</span>
                </div>
                <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              
              <Link 
                href="/dashboard" 
                onClick={closeSidebar} 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                href="/profile" 
                onClick={closeSidebar} 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profil</span>
              </Link>
              
              <Link 
                href="/orders" 
                onClick={closeSidebar} 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>Pesanan Saya</span>
              </Link>
              
              {role === "ADMIN" && (
                <Link 
                  href="/admin" 
                  onClick={closeSidebar} 
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* Bottom Action Buttons */}
        <div className="mt-auto p-6 border-t bg-gray-50">
          {isLogin ? (
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Masuk sebagai <span className="font-medium">{session?.user?.name}</span>
                </p>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" onClick={closeSidebar}>
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href="/register" onClick={closeSidebar}>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Daftar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  )
}

export default Sidebar