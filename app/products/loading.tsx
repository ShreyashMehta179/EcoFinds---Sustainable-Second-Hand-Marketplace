import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Filters Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full sm:w-80" />
            <Skeleton className="h-10 w-full sm:w-64" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        {/* Results Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-24" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
