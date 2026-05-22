import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CreditCard from "@/components/shared/CreditCard"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCartItems, selectCartTotal, resetCart } from "@/store/cartSlice"
import { createOrder } from "@/store/ordersSlice"
import { formatPrice } from "@/utils/formatPrice"
import { createOrderId } from "@/utils/createOrderId"
import type { CheckoutFormData } from "@/schemas/checkoutSchema"

const DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 4.99

const Checkout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cartItems = useAppSelector(selectCartItems)
  const cartTotal = useAppSelector(selectCartTotal)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFreeDelivery = cartTotal >= DELIVERY_THRESHOLD
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE
  const orderTotal = cartTotal + deliveryFee

  // Guard — redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/shop">
          <Button>Browse Plants</Button>
        </Link>
      </div>
    )
  }

  const handlePayment = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const orderId = createOrderId()

    dispatch(
      createOrder({
        id: orderId,
        items: cartItems,
        total: orderTotal,
        cardNumber: data.cardNumber,
        status: "pending",
        createdAt: new Date().toISOString(),
      })
    )

    dispatch(resetCart())
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="py-10 flex flex-col gap-8">
      {/* Back */}
      <Link
        to="/cart"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-4xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="flex flex-col divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-1 justify-between items-center min-w-0">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary shrink-0">
                      €{formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/40 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                {isFreeDelivery ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>€{formatPrice(DELIVERY_FEE)}</span>
                )}
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">€{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <CreditCard onSubmit={handlePayment} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  )
}

export default Checkout
