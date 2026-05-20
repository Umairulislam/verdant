import { useSearchParams } from "react-router"
import { Leaf } from "lucide-react"
import PlantCard from "@/components/shared/PlantCard"
import FilterBar from "@/components/shared/FilterBar"
import { getFilteredPlants } from "@/data/plants"

const Shop = () => {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category") || "all"
  const difficulty = searchParams.get("difficulty") || "all"
  const light = searchParams.get("light") || "all"

  const filteredPlants = getFilteredPlants(category, difficulty, light)

  return (
    <div className="py-10 flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold">Shop All Plants</h1>
        <p className="text-muted-foreground mt-2">
          Find the perfect plant for your space and lifestyle
        </p>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{filteredPlants.length}</span> plants
      </p>

      {/* Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="p-4 rounded-full bg-muted">
            <Leaf className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No plants found</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Try adjusting your filters to find what you're looking for
          </p>
        </div>
      )}
    </div>
  )
}

export default Shop
