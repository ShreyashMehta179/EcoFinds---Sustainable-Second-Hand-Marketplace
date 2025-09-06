"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  initialValue?: string
}

export function SearchBar({ placeholder = "Search products...", onSearch, initialValue = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-8"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
        <Search className="w-4 h-4" />
      </Button>
    </form>
  )
}
