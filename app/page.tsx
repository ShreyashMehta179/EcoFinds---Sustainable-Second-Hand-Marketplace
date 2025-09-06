"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Recycle, Heart, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

// import dynamic from "next/dynamic"
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
// import ecoAnimation from "@/public/animations/eco.json"

const featuredCategories = [
  {
    name: "Clothing & Fashion",
    description: "Pre-loved clothes, shoes, bags & accessories",
    icon: "👕",
    href: "/products?category=Clothing%20%26%20Fashion",
  },
  {
    name: "Furniture & Home Decor",
    description: "Second-hand furniture & eco-friendly décor",
    icon: "🪑",
    href: "/products?category=Furniture%20%26%20Home%20Decor",
  },
  {
    name: "Electronics & Gadgets",
    description: "Refurbished laptops, phones & appliances",
    icon: "📱",
    href: "/products?category=Electronics%20%26%20Gadgets",
  },
  {
    name: "Books & Stationery",
    description: "Used books, novels & recycled stationery",
    icon: "📚",
    href: "/products?category=Books%20%26%20Stationery",
  },
]

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Reduce waste by giving items a second life",
  },
  {
    icon: Recycle,
    title: "Sustainable",
    description: "Support circular economy and sustainability",
  },
  {
    icon: Heart,
    title: "Quality Assured",
    description: "Carefully curated pre-loved items",
  },
  {
    icon: ShoppingBag,
    title: "Great Deals",
    description: "Amazing prices on quality products",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content with animations */}
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Buy Smart. Live <span className="text-green-600">Sustainable</span>.
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Discover second-hand treasures and eco-friendly products while reducing environmental impact.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard">Sell Your Items</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - CSS-based eco animation */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-md lg:max-w-lg h-96 flex items-center justify-center">
                {/* Animated Earth/Globe */}
                <motion.div
                  className="relative w-48 h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-2xl"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                >
                  {/* Continents */}
                  <div className="absolute inset-4 bg-green-600 rounded-full opacity-70"></div>
                  <div className="absolute top-8 left-12 w-8 h-6 bg-green-700 rounded-full"></div>
                  <div className="absolute bottom-12 right-8 w-12 h-8 bg-green-700 rounded-lg"></div>

                  {/* Floating leaves around the globe */}
                  <motion.div
                    className="absolute -top-4 -left-4 text-green-600"
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Leaf size={32} />
                  </motion.div>

                  <motion.div
                    className="absolute -top-2 -right-6 text-emerald-500"
                    animate={{
                      y: [10, -10, 10],
                      rotate: [0, -15, 15, 0],
                    }}
                    transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                  >
                    <Leaf size={28} />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-6 text-green-500"
                    animate={{
                      y: [-8, 8, -8],
                      rotate: [0, 20, -20, 0],
                    }}
                    transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  >
                    <Leaf size={24} />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -right-4 text-emerald-600"
                    animate={{
                      y: [8, -8, 8],
                      rotate: [0, -25, 25, 0],
                    }}
                    transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                  >
                    <Leaf size={30} />
                  </motion.div>
                </motion.div>

                {/* Orbiting recycle icons */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="relative w-72 h-72">
                    <motion.div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-green-600">
                      <Recycle size={24} />
                    </motion.div>
                    <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-emerald-600">
                      <Recycle size={20} />
                    </motion.div>
                    <motion.div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-500">
                      <Recycle size={22} />
                    </motion.div>
                    <motion.div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <Recycle size={18} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose EcoFinds?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our wide range of sustainable second-hand products across various categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href={category.href}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty">{category.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/products">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-balance">Ready to Make a Difference?</h2>
          <p className="text-green-100 mb-8 text-lg text-pretty">
            Join thousands of conscious consumers who are choosing sustainable shopping
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/auth/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
