"use client"

import { CategoryFilter } from "./category-filter"
import { SearchBar } from "./search-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFiltersProps {
  selectedCategory?: string
  searchQuery?: string
  onCategoryChange: (category: string | undefined) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
  showEcoFriendlyOnly?: boolean
  onEcoFriendlyChange: (checked: boolean) => void
}

export function ProductFilters({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onClearFilters,
  showEcoFriendlyOnly = false,
  onEcoFriendlyChange,
}: ProductFiltersProps) {
  const hasActiveFilters = selectedCategory || searchQuery || showEcoFriendlyOnly

  return (
    <div className="space-y-4">
      {/* Search and Category - Always visible */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <SearchBar onSearch={onSearchChange} initialValue={searchQuery} placeholder="Search products..." />
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />

        {/* Mobile Filters Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="sm:hidden bg-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search results</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="eco-friendly-mobile"
                  checked={showEcoFriendlyOnly}
                  onCheckedChange={onEcoFriendlyChange}
                />
                <label htmlFor="eco-friendly-mobile" className="text-sm font-medium">
                  Eco-Friendly Only
                </label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Additional Filters */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="eco-friendly" checked={showEcoFriendlyOnly} onCheckedChange={onEcoFriendlyChange} />
          <label htmlFor="eco-friendly" className="text-sm font-medium">
            Eco-Friendly Only
          </label>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onCategoryChange(undefined)} />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {showEcoFriendlyOnly && (
            <Badge variant="secondary" className="gap-1">
              Eco-Friendly
              <X className="w-3 h-3 cursor-pointer" onClick={() => onEcoFriendlyChange(false)} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
