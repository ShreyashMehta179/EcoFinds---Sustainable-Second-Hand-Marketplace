"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/lib/mock-data"

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full sm:w-64">
      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) => onCategoryChange(value === "all" ? undefined : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
