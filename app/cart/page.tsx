"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package } from "lucide-react"
import { cartStorage, type CartItemWithProduct } from "@/lib/cart"
import { getProductById } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    const cart = cartStorage.getCart()
    const itemsWithProducts = cart
      .map((item) => {
        const product = getProductById(item.productId)
        return {
          ...item,
          product: product
            ? {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                seller: product.seller,
                condition: product.condition,
              }
            : null,
        }
      })
      .filter((item) => item.product !== null) as CartItemWithProduct[]

    setCartItems(itemsWithProducts)
    setIsLoading(false)
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    cartStorage.updateQuantity(productId, newQuantity)
    loadCartItems()

    if (newQuantity === 0) {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    }
  }

  const removeItem = (productId: string) => {
    cartStorage.removeFromCart(productId)
    loadCartItems()
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    })
  }

  const clearCart = () => {
    cartStorage.clearCart()
    loadCartItems()
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 99
  const total = subtotal + shipping

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any sustainable products to your cart yet. Start shopping to make a positive
              impact!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/products">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.productId}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link href={`/products/${item.productId}`}>
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/products/${item.productId}`}>
                            <h3 className="font-semibold text-foreground hover:text-green-600 transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.productId)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.product.condition}
                          </Badge>
                          <span className="text-sm text-muted-foreground">by {item.product.seller}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-muted-foreground">
                                ₹{item.product.price.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping === 0 && <p className="text-xs text-green-600">Free shipping on orders over ₹1,000</p>}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-green-600">₹{total.toLocaleString()}</span>
                  </div>

                  {/* ✅ Redirect to Checkout Page */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 mb-4"
                    size="lg"
                    onClick={() => router.push("/checkout")}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
