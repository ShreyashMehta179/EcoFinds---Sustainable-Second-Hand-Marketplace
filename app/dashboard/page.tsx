"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, Package, Users, DollarSign } from "lucide-react"
import { authStorage } from "@/lib/auth"
import { categories, type Product } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState(authStorage.getAuthState().user)
  const [userProducts, setUserProducts] = useState<Product[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    condition: "Good" as const,
  })

  // ✅ Wait until client mount to avoid hydration error
  useEffect(() => {
    setMounted(true)

    const authState = authStorage.getAuthState()
    if (!authState.isAuthenticated) {
      router.push("/auth/login")
      return
    }
    setUser(authState.user)

    // ✅ fetch products from DB
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setUserProducts(data))
      .catch((err) => console.error(err))
  }, [router])

  if (!mounted) return null

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: Number.parseInt(newProduct.price),
          image: "/placeholder.svg",
          seller: user?.name || "You",
          location: user?.location || "Your Location",
          userId: user?.id,
        }),
      })

      if (!res.ok) throw new Error("Failed to add product")
      const product = await res.json()

      setUserProducts([...userProducts, product])
      setNewProduct({ name: "", price: "", category: "", description: "", condition: "Good" })
      setIsAddingProduct(false)

      toast({
        title: "Product added!",
        description: "Your product has been listed successfully.",
      })
    } catch (err) {
      toast({ title: "Error", description: "Failed to add product", variant: "destructive" })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      })

      if (!res.ok) throw new Error("Failed to delete")

      setUserProducts(userProducts.filter((p) => p.id !== productId))
      toast({ title: "Product deleted", description: "Your product has been removed." })
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" })
    }
  }

  const stats = [
    { title: "Total Listings", value: userProducts.length, icon: Package, color: "text-blue-600" },
    { title: "Total Views", value: "1,234", icon: Eye, color: "text-green-600" },
    { title: "Total Sales", value: "₹12,450", icon: DollarSign, color: "text-purple-600" },
    { title: "Active Buyers", value: "23", icon: Users, color: "text-orange-600" },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please sign in</h2>
          <p className="text-muted-foreground mb-4">You need to be logged in to access your dashboard.</p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <Button onClick={() => setIsAddingProduct(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Listings */}
          <TabsContent value="listings" className="space-y-6">
            {/* Add Product Form */}
            {isAddingProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>List a new item for sale on EcoFinds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Form inputs (same as before) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Price (₹)</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        placeholder="Enter price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* Category & Condition */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Category</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productCondition">Condition</Label>
                      <Select
                        value={newProduct.condition}
                        onValueChange={(value: any) => setNewProduct({ ...newProduct, condition: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Description</Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Describe your product..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                      Add Product
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto text-destructive hover:text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {product.condition}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/products/${product.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileName">Full Name</Label>
                    <Input id="profileName" value={user.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input id="profileEmail" value={user.email} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileLocation">Location</Label>
                  <Input id="profileLocation" value={user.location} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <p className="text-sm text-muted-foreground">
                    {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
