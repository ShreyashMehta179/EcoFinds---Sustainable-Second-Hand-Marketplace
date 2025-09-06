"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { authStorage } from "@/lib/auth"

interface Order {
  id: string
  items: {
    productId: string
    productName: string
    productImage: string
    quantity: number
    price: number
    seller: string
  }[]
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  orderDate: Date
  deliveryDate?: Date
  trackingNumber?: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      {
        productId: "1",
        productName: "Ethnic Kurta Set",
        productImage: "/placeholder.svg?key=x626k",
        quantity: 1,
        price: 499,
        seller: "Priya Sharma",
      },
      {
        productId: "5",
        productName: "Handmade Bamboo Lamp",
        productImage: "/placeholder.svg?key=s2kbe",
        quantity: 1,
        price: 699,
        seller: "Green Living Co.",
      },
    ],
    total: 1198,
    status: "delivered",
    orderDate: new Date("2024-01-15"),
    deliveryDate: new Date("2024-01-20"),
    trackingNumber: "ECO123456789",
  },
  {
    id: "ORD-002",
    items: [
      {
        productId: "7",
        productName: "Refurbished iPhone X",
        productImage: "/placeholder.svg?key=d4vdt",
        quantity: 1,
        price: 12999,
        seller: "TechSecond",
      },
    ],
    total: 12999,
    status: "shipped",
    orderDate: new Date("2024-01-25"),
    trackingNumber: "ECO987654321",
  },
  {
    id: "ORD-003",
    items: [
      {
        productId: "19",
        productName: "Steel Water Bottle",
        productImage: "/placeholder.svg?height=300&width=300",
        quantity: 2,
        price: 299,
        seller: "Eco Essentials",
      },
    ],
    total: 598,
    status: "pending",
    orderDate: new Date("2024-02-01"),
  },
]

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100", label: "Processing" },
  shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-100", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Delivered" },
  cancelled: { icon: Package, color: "text-red-600", bg: "bg-red-100", label: "Cancelled" },
}

export default function OrdersPage() {
  const [user, setUser] = useState(authStorage.getAuthState().user)
  const [orders, setOrders] = useState<Order[]>([])
  const router = useRouter()

  useEffect(() => {
    const authState = authStorage.getAuthState()
    if (!authState.isAuthenticated) {
      router.push("/auth/login")
      return
    }
    setUser(authState.user)
    setOrders(mockOrders)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please sign in</h2>
          <p className="text-muted-foreground mb-4">You need to be logged in to view your orders.</p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your EcoFinds purchases</p>
          </div>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't made any purchases yet. Start shopping for sustainable products!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = statusConfig[order.status]
              const StatusIcon = statusInfo.icon

              return (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order {order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {order.orderDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${statusInfo.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                        </div>
                        <Badge variant="secondary">{statusInfo.label}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.productImage || "/placeholder.svg"}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground line-clamp-1">{item.productName}</h4>
                            <p className="text-sm text-muted-foreground">by {item.seller}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                              <span className="text-sm font-medium text-green-600">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        {order.trackingNumber && (
                          <p className="text-sm text-muted-foreground">
                            Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        )}
                        {order.deliveryDate && (
                          <p className="text-sm text-muted-foreground">
                            Delivered on {order.deliveryDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-bold text-green-600">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
