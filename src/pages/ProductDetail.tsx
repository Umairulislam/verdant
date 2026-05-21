import { useParams, useNavigate } from "react-router"
import {
  Droplets,
  Sun,
  Thermometer,
  Wind,
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addItem, removeItem, selectItemQuantity } from "@/store/cartSlice"
import { getPlantById } from "@/data/plants"

const difficultyColor = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  expert: "bg-red-100 text-red-700",
}

const careDetails = (plant: ReturnType<typeof getPlantById>) => [
  {
    icon: <Sun className="h-5 w-5 text-yellow-500" />,
    label: "Light",
    value: plant!.light,
  },
  {
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
    label: "Water",
    value: plant!.water,
  },
  {
    icon: <Wind className="h-5 w-5 text-primary" />,
    label: "Humidity",
    value: plant!.humidity,
  },
  {
    icon: <Thermometer className="h-5 w-5 text-orange-500" />,
    label: "Temperature",
    value: plant!.temperature,
  },
]

const ProductDetail = () => {
  const { plantId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const plant = getPlantById(plantId!)
  const quantity = useAppSelector(selectItemQuantity(plantId!))

  // Plant not found state
  if (!plant) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <h2 className="text-2xl font-bold">Plant not found</h2>
        <p className="text-muted-foreground">
          The plant you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    )
  }

  return (
    <div className="py-10 flex flex-col gap-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden h-[500px]">
          <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap items-center">
            <Badge variant="secondary" className="capitalize">
              {plant.category}
            </Badge>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${difficultyColor[plant.difficulty]}`}
            >
              {plant.difficulty}
            </span>
            {!plant.inStock && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Name & Price */}
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">{plant.name}</h1>
            <p className="text-muted-foreground italic">{plant.scientificName}</p>
          </div>

          <p className="text-3xl font-bold text-primary">€{plant.price.toFixed(2)}</p>

          <p className="text-muted-foreground leading-relaxed">{plant.description}</p>

          <Separator />

          {/* Care Guide */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Care Guide
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {careDetails(plant).map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border"
                >
                  {detail.icon}
                  <div>
                    <p className="text-xs text-muted-foreground">{detail.label}</p>
                    <p className="text-sm font-medium capitalize">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Add to Cart */}
          {plant.inStock ? (
            quantity === 0 ? (
              <Button size="lg" className="w-full gap-2" onClick={() => dispatch(addItem(plant))}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 border rounded-xl p-1">
                  <Button variant="ghost" size="icon" onClick={() => dispatch(removeItem(plant))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => dispatch(addItem(plant))}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Subtotal:{" "}
                  <span className="font-semibold text-foreground">
                    €{(plant.price * quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            )
          ) : (
            <Button size="lg" variant="outline" disabled className="w-full">
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
