import { useSearchParams } from "react-router"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { PlantCategory } from "@/types"

const categories: { label: string; value: PlantCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Tropical", value: "tropical" },
  { label: "Succulents", value: "succulents" },
  { label: "Ferns", value: "ferns" },
  { label: "Flowering", value: "flowering" },
  { label: "Air Purifying", value: "air-purifying" },
]

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get("category") || "all"
  const activeDifficulty = searchParams.get("difficulty") || "all"
  const activeLight = searchParams.get("light") || "all"

  const hasActiveFilters =
    activeCategory !== "all" || activeDifficulty !== "all" || activeLight !== "all"

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    setSearchParams(params)
  }

  const clearFilters = () => setSearchParams({})

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters</span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto gap-1 text-muted-foreground h-7 px-2"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat.value}
            onClick={() => updateFilter("category", cat.value)}
            variant={activeCategory === cat.value ? "default" : "outline"}
            className="cursor-pointer capitalize"
          >
            {cat.label}
          </Badge>
        ))}
      </div>

      {/* Difficulty & Light Selects */}
      <div className="flex gap-3 flex-wrap">
        <Select value={activeDifficulty} onValueChange={(val) => updateFilter("difficulty", val)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>

        <Select value={activeLight} onValueChange={(val) => updateFilter("light", val)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Light" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Light Levels</SelectItem>
            <SelectItem value="low">Low Light</SelectItem>
            <SelectItem value="medium">Medium Light</SelectItem>
            <SelectItem value="bright">Bright Light</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default FilterBar
