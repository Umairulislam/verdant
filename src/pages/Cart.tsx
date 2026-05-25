import { Link, useNavigate } from "react-router"
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  addItem,
  removeItem,
  deleteItem,
  selectCartItems,
  selectCartTotal,
} from "@/store/cartSlice"
import { formatPrice } from "@/utils/formatPrice"
import { toast } from "sonner"

const DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 4.99

const Cart = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cartItems = useAppSelector(selectCartItems)
  const cartTotal = useAppSelector(selectCartTotal)

  const isFreeDelivery = cartTotal >= DELIVERY_THRESHOLD
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE
  const orderTotal = cartTotal + deliveryFee

  // Empty state
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
        <div className="p-6 rounded-full bg-muted">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-1">Looks like you haven't added any plants yet</p>
        </div>
        <Link to="/shop">
          <Button className="gap-2">
            <Leaf className="h-4 w-4" />
            Browse Plants
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-10 flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground mt-1">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl border bg-card">
              {/* Image */}
              <Link to={`/shop/${item.id}`}>
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              </Link>

              {/* Details */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/shop/${item.id}`}>
                    <h3 className="font-semibold leading-tight hover:text-primary transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(deleteItem(item))
                      toast.success(`${item.name} removed from cart`)
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <Badge variant="secondary" className="capitalize w-fit text-xs">
                  {item.category}
                </Badge>

                <div className="flex items-center justify-between mt-auto pt-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border rounded-lg p-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => dispatch(addItem(item))}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Line Total */}
                  <p className="font-semibold text-primary">
                    €{formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4 sticky top-24">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <Separator />

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">€{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                {isFreeDelivery ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span className="font-medium">€{formatPrice(DELIVERY_FEE)}</span>
                )}
              </div>

              {/* Free delivery progress */}
              {!isFreeDelivery && (
                <p className="text-xs text-muted-foreground bg-muted rounded-lg p-2 text-center">
                  Add{" "}
                  <span className="font-semibold text-foreground">
                    €{formatPrice(DELIVERY_THRESHOLD - cartTotal)}
                  </span>{" "}
                  more for free delivery
                </p>
              )}
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">€{formatPrice(orderTotal)}</span>
            </div>

            <Button size="lg" className="w-full gap-2" onClick={() => navigate("/checkout")}>
              Checkout
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Link to="/shop" className="text-center">
              <Button variant="ghost" className="w-full text-muted-foreground">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
