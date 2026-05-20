import type { Plant } from "@/types"

export const plants: Plant[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    price: 34.99,
    category: "tropical",
    difficulty: "easy",
    light: "medium",
    water: "Every 7–10 days",
    humidity: "High",
    temperature: "18–27°C",
    description:
      "The iconic split-leaf plant. Fast growing and dramatic — perfect for bright living rooms.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    price: 24.99,
    category: "air-purifying",
    difficulty: "easy",
    light: "low",
    water: "Every 14 days",
    humidity: "Low",
    temperature: "15–29°C",
    description: "Almost indestructible. Thrives on neglect and purifies the air while you sleep.",
    image: "https://images.unsplash.com/photo-1593482892540-73c9199d8949?w=500&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    price: 19.99,
    category: "flowering",
    difficulty: "easy",
    light: "low",
    water: "Every 7 days",
    humidity: "High",
    temperature: "18–30°C",
    description:
      "Elegant white blooms in low light. One of the few flowering plants that thrives indoors.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5??w=500&fit=crop",
    inStock: true,
    featured: false,
  },
  {
    id: "4",
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    price: 18.99,
    category: "ferns",
    difficulty: "moderate",
    light: "medium",
    water: "Every 3–4 days",
    humidity: "High",
    temperature: "16–24°C",
    description: "Lush, arching fronds that bring a wild forest feel to any space. Loves humidity.",
    image: "https://images.unsplash.com/photo-1610491536492-cee9f12c860f?w=500&fit=crop",
    inStock: true,
    featured: false,
  },
  {
    id: "5",
    name: "Echeveria",
    scientificName: "Echeveria elegans",
    price: 12.99,
    category: "succulents",
    difficulty: "easy",
    light: "bright",
    water: "Every 14 days",
    humidity: "Low",
    temperature: "18–26°C",
    description:
      "A rosette-shaped succulent with powdery blue-grey leaves. Minimal care, maximum charm.",
    image: "https://images.unsplash.com/photo-1668508380767-a13f204bde1c?w=500&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    name: "Bird of Paradise",
    scientificName: "Strelitzia reginae",
    price: 54.99,
    category: "tropical",
    difficulty: "moderate",
    light: "bright",
    water: "Every 7 days",
    humidity: "Medium",
    temperature: "18–30°C",
    description:
      "A bold statement plant with enormous paddle-shaped leaves. The crown jewel of any room.",
    image: "https://images.unsplash.com/photo-1631122750867-6cfee01358b5?w=500&fit=crop",
    inStock: true,
    featured: true,
  },
  {
    id: "7",
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    price: 49.99,
    category: "tropical",
    difficulty: "expert",
    light: "bright",
    water: "Every 7 days",
    humidity: "Medium",
    temperature: "16–24°C",
    description:
      "The designer's favourite. Dramatic violin-shaped leaves demand attention — and a little patience.",
    image: "https://images.unsplash.com/photo-1638741280384-36839c90f329?w=500&fit=crop",
    inStock: false,
    featured: false,
  },
  {
    id: "8",
    name: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    price: 29.99,
    category: "air-purifying",
    difficulty: "easy",
    light: "low",
    water: "Every 14–21 days",
    humidity: "Low",
    temperature: "15–26°C",
    description:
      "Glossy, waxy leaves that shine without any effort. Survives drought and low light with ease.",
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500&fit=crop",
    inStock: true,
    featured: false,
  },
]

export const getFeaturedPlants = () => plants.filter((p) => p.featured)
export const getPlantById = (id: string) => plants.find((p) => p.id === id)
export const getFilteredPlants = (category?: string, difficulty?: string, light?: string) => {
  return plants.filter((plant) => {
    const matchCategory = !category || category === "all" || plant.category === category
    const matchDifficulty = !difficulty || difficulty === "all" || plant.difficulty === difficulty
    const matchLight = !light || light === "all" || plant.light === light
    return matchCategory && matchDifficulty && matchLight
  })
}
