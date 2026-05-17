import { Link } from "react-router"
import { Leaf } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">Verdant</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bringing nature indoors. Thoughtfully curated plants for every space and skill level.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Shop</p>
              <Link
                to="/shop"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                All Plants
              </Link>
              <Link
                to="/shop?category=tropical"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Tropical
              </Link>
              <Link
                to="/shop?category=succulents"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Succulents
              </Link>
              <Link
                to="/shop?category=air-purifying"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Air Purifying
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Account</p>
              <Link
                to="/sign-in"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/cart"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cart
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Verdant. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
