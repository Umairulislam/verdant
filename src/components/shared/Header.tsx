import { Link, NavLink } from "react-router"
import { ShoppingCart, Leaf, Menu, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectIsAuthenticated, selectUser, signOut } from "@/store/authSlice"
import { selectCartCount } from "@/store/cartSlice"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
]

const NavLinks = ({ onClose }: { onClose?: () => void }) => (
  <>
    {navLinks.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        onClick={onClose}
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </>
)

const Header = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const cartCount = useAppSelector(selectCartCount)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Verdant</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground font-normal">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={() => dispatch(signOut())}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>
                <div className="flex items-center gap-2 mb-8">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-bold">Verdant</span>
                </div>
              </SheetTitle>
              <nav className="flex flex-col gap-6">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
