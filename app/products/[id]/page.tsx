"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Share2, MapPin, User, Shield, Leaf, ShoppingCart, Plus, Minus } from "lucide-react"
import { getProductById, mockProducts } from "@/lib/mock-data"
import { cartStorage } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState(getProductById(params.id as string))
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState(mockProducts.slice(0, 4))

  useEffect(() => {
    if (!product) {
      router.push("/products")
      return
    }

    // Get related products from same category
    const related = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    setRelatedProducts(related)
  }, [product, router])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    cartStorage.addToCart(product.id, quantity)

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })

    setIsAddingToCart(false)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.condition}</Badge>
                {product.isEcoFriendly && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Friendly
                  </Badge>
                )}
              </div>

              <p className="text-4xl font-bold text-green-600 mb-4">₹{product.price.toLocaleString()}</p>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Seller Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Seller Information</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{product.seller}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {product.location}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                Secure checkout with buyer protection
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-green-600 transition-colors line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-green-600">₹{relatedProduct.price.toLocaleString()}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
