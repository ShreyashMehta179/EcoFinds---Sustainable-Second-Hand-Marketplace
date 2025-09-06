"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/mock-data" // ✅ import from your mock-data

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Product Image */}
      <div className="relative w-full h-48">
        <Image
          src={product.image || "/placeholder.png"} // ✅ mock-data uses `image`
          alt={product.name} // ✅ mock-data uses `name`
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-green-600">₹{product.price}</span>
          <Button asChild size="sm">
            <Link href={`/products/${product.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
