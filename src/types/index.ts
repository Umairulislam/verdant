export type PlantCategory = "tropical" | "succulents" | "ferns" | "flowering" | "air-purifying"

export type PlantDifficulty = "easy" | "moderate" | "expert"

export type PlantLight = "low" | "medium" | "bright"

export type Plant = {
  id: string
  name: string
  scientificName: string
  price: number
  category: PlantCategory
  difficulty: PlantDifficulty
  light: PlantLight
  water: string // e.g. "Every 7 days"
  humidity: string // e.g. "High"
  temperature: string // e.g. "18–27°C"
  description: string
  image: string // filename from public/images/plants/
  inStock: boolean
  featured: boolean
}

export type CartItem = Plant & {
  quantity: number
}

export type OrderStatus = "pending" | "confirmed" | "delivered"

export type Order = {
  id: string
  items: CartItem[]
  total: number
  cardNumber: string
  status: OrderStatus
  createdAt: string
}

export type AuthUser = {
  name: string
  email: string
}
