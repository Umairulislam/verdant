import { Link } from "react-router"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/store/hooks"
import { addItem } from "@/store/cartSlice"
import type { Plant } from "@/types"

const difficultyColor = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  expert: "bg-red-100 text-red-700",
}

type PlantCardProps = {
  plant: Plant
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const dispatch = useAppDispatch()

  return (
    <Card className="group overflow-hidden flex flex-col h-full">
      {/* Image */}
      <Link to={`/shop/${plant.id}`}>
        <div className="overflow-hidden h-56">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="flex flex-col gap-2 pt-4 flex-1">
        {/* Badges */}
        <div className="flex gap-2">
          <Badge variant="secondary" className="capitalize text-xs">
            {plant.category}
          </Badge>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${difficultyColor[plant.difficulty]}`}
          >
            {plant.difficulty}
          </span>
        </div>

        {/* Name & Price */}
        <Link to={`/shop/${plant.id}`}>
          <h3 className="font-semibold text-base leading-tight hover:text-primary transition-colors">
            {plant.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground italic">{plant.scientificName}</p>
        <p className="text-lg font-bold text-primary mt-auto">€{plant.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter>
        {plant.inStock ? (
          <Button className="w-full" onClick={() => dispatch(addItem(plant))}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <Button className="w-full" variant="outline" disabled>
            Out of Stock
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default PlantCard
