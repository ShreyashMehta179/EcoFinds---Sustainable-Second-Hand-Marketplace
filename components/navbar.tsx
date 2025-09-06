"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react"
import { cartStorage } from "@/lib/cart"

const categories = [
  "Clothing & Fashion",
  "Furniture & Home Decor",
  "Electronics & Gadgets",
  "Books & Stationery",
  "Kids & Baby Products",
  "Sports & Outdoor Gear",
  "Household Essentials",
  "Eco-Friendly Special Products",
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(cartStorage.getCartCount())
    }

    updateCartCount()

    window.addEventListener("storage", updateCartCount)
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-green-600">EcoFinds</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-green-600 transition-colors">
              Browse Products
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-green-600 transition-colors">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link href={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-foreground hover:text-green-600 transition-colors">
                Browse Products
              </Link>
              <div className="pl-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block py-1 text-sm text-foreground hover:text-green-600 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
