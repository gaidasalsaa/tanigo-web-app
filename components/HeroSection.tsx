'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Users, ShoppingBag, Star, MapPin, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    { icon: Users, text: "500+ Petani & Pengrajin", color: "text-emerald-600" },
    { icon: ShoppingBag, text: "1000+ Produk Tersedia", color: "text-blue-600" },
    { icon: Star, text: "Rating 4.8/5", color: "text-amber-500" },
    { icon: TrendingUp, text: "Pertumbuhan 200%", color: "text-purple-600" }
  ];

  const slides = [
    { image: "/api/placeholder/600/400", title: "Hasil Bumi Segar" },
    { image: "/api/placeholder/600/400", title: "Kerajinan Tradisional" },
    { image: "/api/placeholder/600/400", title: "Produk Unggulan" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border border-emerald-300/30 rounded-full">
              <MapPin className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-300 font-medium">Platform Digital Ngrayun</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
                  Hasil Bumi &
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Kerajinan Ngrayun
                </span>
                <br />
                <span className="text-white/90 text-3xl lg:text-4xl font-semibold">
                  Ponorogo
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Menghubungkan petani dan pengrajin lokal dengan pasar yang lebih luas. 
              <span className="text-emerald-300 font-semibold"> Temukan produk segar dan kerajinan berkualitas</span> 
              langsung dari tangan ahli.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  <span className="text-white/90 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Jelajahi Produk
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                Bergabung Sebagai Penjual
              </button>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            {/* Main Image Container */}
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 rounded-2xl blur opacity-75 animate-pulse"></div>
              
              {/* Image carousel */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
                <div className="aspect-[4/3] relative">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 to-blue-600/20 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                            <Leaf className="w-12 h-12 text-emerald-300" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
                          <p className="text-gray-300">Kualitas terbaik dari Ngrayun</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-emerald-400 w-8' : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">Live</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">1,247 pengunjung aktif</p>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-bold">4.8</span>
                </div>
                <p className="text-gray-300 text-sm">Rating Pengguna</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;