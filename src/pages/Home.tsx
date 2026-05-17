import { Link } from "react-router"
import { ArrowRight, Leaf, Droplets, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PlantCard from "@/components/shared/PlantCard"
import { getFeaturedPlants } from "@/data/plants"
import type { PlantCategory } from "@/types"

const categories: { label: string; value: PlantCategory; emoji: string; description: string }[] = [
  { label: "Tropical", value: "tropical", emoji: "🌴", description: "Bold & dramatic" },
  { label: "Succulents", value: "succulents", emoji: "🌵", description: "Low maintenance" },
  { label: "Ferns", value: "ferns", emoji: "🌿", description: "Lush & wild" },
  { label: "Flowering", value: "flowering", emoji: "🌸", description: "Colour & life" },
  { label: "Air Purifying", value: "air-purifying", emoji: "✨", description: "Clean your air" },
]

const benefits = [
  {
    icon: <Leaf className="h-6 w-6 text-primary" />,
    title: "Expert Curation",
    description:
      "Every plant is hand-selected by our horticulturists for health, beauty, and indoor suitability.",
  },
  {
    icon: <Droplets className="h-6 w-6 text-primary" />,
    title: "Care Guides Included",
    description:
      "Each plant comes with a detailed care guide covering water, light, humidity, and temperature.",
  },
  {
    icon: <Sun className="h-6 w-6 text-primary" />,
    title: "Thrives Indoors",
    description:
      "Our selection is specifically chosen for indoor environments — no garden required.",
  },
]

const featuredPlants = getFeaturedPlants()

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="container mx-auto max-w-6xl px-4 py-24 flex flex-col items-center text-center gap-6">
        <Badge variant="outline" className="text-primary border-primary px-3 py-1">
          🌿 Free delivery on orders over €50
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Bring Nature <br />
          <span className="text-primary">Indoors</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Thoughtfully curated indoor plants for every space and skill level. From bold tropicals to
          easy-care succulents.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link to="/shop">
            <Button size="lg" className="gap-2">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline">
              Browse Categories
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Featured Plants ── */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-primary font-medium mb-1">Handpicked for you</p>
              <h2 className="text-3xl font-bold">Featured Plants</h2>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="gap-1 text-muted-foreground">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-1">Find your match</p>
            <h2 className="text-3xl font-bold">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                to={`/shop?category=${cat.value}`}
                className="group flex flex-col items-center gap-2 p-6 rounded-xl border bg-background hover:border-primary hover:bg-primary/5 transition-all"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <p className="font-semibold text-sm">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Verdant ── */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-1">Why choose us</p>
            <h2 className="text-3xl font-bold">The Verdant Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">{benefit.icon}</div>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-12 flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl font-bold">Ready to grow your space?</h2>
            <p className="text-muted-foreground max-w-md">
              Join thousands of plant lovers who've transformed their homes with Verdant.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gap-2 mt-2">
                Start Shopping <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
