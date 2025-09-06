"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { mockProducts, getProductsByCategory, searchProducts } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState("")
  const [showEcoFriendlyOnly, setShowEcoFriendlyOnly] = useState(false)

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams])

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    let products = mockProducts

    // Filter by category
    if (selectedCategory) {
      products = getProductsByCategory(selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const searchResults = searchProducts(searchQuery.trim())
      products = selectedCategory ? products.filter((p) => searchResults.some((sr) => sr.id === p.id)) : searchResults
    }

    // Filter by eco-friendly
    if (showEcoFriendlyOnly) {
      products = products.filter((p) => p.isEcoFriendly)
    }

    return products
  }, [selectedCategory, searchQuery, showEcoFriendlyOnly])

  const handleClearFilters = () => {
    setSelectedCategory(undefined)
    setSearchQuery("")
    setShowEcoFriendlyOnly(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Products</h1>
          <p className="text-muted-foreground">Discover sustainable second-hand items from our community</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            showEcoFriendlyOnly={showEcoFriendlyOnly}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onEcoFriendlyChange={setShowEcoFriendlyOnly}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
            </h2>
            {selectedCategory && (
              <Badge variant="secondary" className="text-sm">
                {selectedCategory}
              </Badge>
            )}
          </div>

          {/* Sort Options - Future Enhancement */}
          <div className="text-sm text-muted-foreground">Sorted by: Relevance</div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery || selectedCategory || showEcoFriendlyOnly
                ? "Try adjusting your filters or search terms to find what you're looking for."
                : "No products are currently available."}
            </p>
            {(searchQuery || selectedCategory || showEcoFriendlyOnly) && (
              <button onClick={handleClearFilters} className="text-green-600 hover:text-green-700 font-medium">
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Load More - Future Enhancement */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">Showing all {filteredProducts.length} products</p>
          </div>
        )}
      </div>
    </div>
  )
}
