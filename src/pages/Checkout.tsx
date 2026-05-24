import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Lock, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import CreditCard from "@/components/shared/CreditCard"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCartItems, selectCartTotal, resetCart } from "@/store/cartSlice"
import { createOrder } from "@/store/ordersSlice"
import { formatPrice } from "@/utils/formatPrice"
import { createOrderId } from "@/utils/createOrderId"
import { checkoutSchema, type CheckoutFormData } from "@/schemas/checkoutSchema"

const DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 4.99

const FormField = ({
  label,
  id,
  error,
  ...props
}: { label: string; id: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
)

const Checkout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cartItems = useAppSelector(selectCartItems)
  const cartTotal = useAppSelector(selectCartTotal)
  const [isFlipped, setIsFlipped] = useState(false)

  const isFreeDelivery = cartTotal >= DELIVERY_THRESHOLD
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE
  const orderTotal = cartTotal + deliveryFee

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange", // validate and clear errors as user types
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      country: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  })

  // Watch payment fields for card preview
  const cardName = watch("cardName")
  const cardNumber = watch("cardNumber")
  const expiry = watch("expiry")
  const cvv = watch("cvv")
  const { onBlur: cvvOnBlur, ...cvvRegister } = register("cvv")

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim()

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4)
    return cleaned.length >= 2 ? cleaned.slice(0, 2) + "/" + cleaned.slice(2) : cleaned
  }

  const onSubmit = async (data: CheckoutFormData) => {
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
        shipping: {
          // add shipping details
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
        },
      })
    )
    dispatch(resetCart())
    navigate(`/order/${orderId}`)
  }

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

  return (
    <div className="py-10 flex flex-col gap-8">
      <Link
        to="/cart"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Link>

      <h1 className="text-4xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Forms */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Shipping */}
            <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Shipping Details</h2>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Full Name"
                  id="fullName"
                  placeholder="John Doe"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <FormField
                  label="Phone"
                  id="phone"
                  placeholder="+1 234 567 8900"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <FormField
                  label="Address"
                  id="address"
                  placeholder="123 Green Street"
                  error={errors.address?.message}
                  {...register("address")}
                />
                <FormField
                  label="City"
                  id="city"
                  placeholder="Amsterdam"
                  error={errors.city?.message}
                  {...register("city")}
                />
                <FormField
                  label="Postcode"
                  id="postcode"
                  placeholder="1234 AB"
                  error={errors.postcode?.message}
                  {...register("postcode")}
                />
                <div className="sm:col-span-2">
                  <FormField
                    label="Country"
                    id="country"
                    placeholder="Netherlands"
                    error={errors.country?.message}
                    {...register("country")}
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <Separator />

              {/* Card Preview */}
              <CreditCard
                cardName={cardName}
                cardNumber={cardNumber}
                expiry={expiry}
                cvv={cvv}
                isFlipped={isFlipped}
              />

              {/* Card Fields */}
              <div className="flex flex-col gap-4">
                <FormField
                  label="Cardholder Name"
                  id="cardName"
                  placeholder="John Doe"
                  error={errors.cardName?.message}
                  {...register("cardName")}
                />

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setValue("cardNumber", formatCardNumber(e.target.value), {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors.cardNumber && (
                    <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) =>
                        setValue("expiry", formatExpiry(e.target.value), { shouldValidate: true })
                      }
                    />
                    {errors.expiry && (
                      <p className="text-sm text-red-500">{errors.expiry.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      maxLength={4}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={(e) => {
                        setIsFlipped(false)
                        cvvOnBlur(e) // preserve RHF's onBlur for validation
                      }}
                      {...cvvRegister}
                      onChange={(e) => setValue("cvv", e.target.value, { shouldValidate: true })}
                    />
                    {errors.cvv && <p className="text-sm text-red-500">{errors.cvv.message}</p>}
                  </div>
                </div>
                {/* Payment card section — after CVV grid */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 mt-2"
                  disabled={isSubmitting}
                >
                  <Lock className="h-4 w-4" />
                  {isSubmitting ? "Processing..." : `Pay €${formatPrice(orderTotal)}`}
                </Button>
              </div>
            </div>
          </div>

          {/* Right — Sticky Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4 sticky top-24">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <Separator />

              {/* Items */}
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 justify-between items-center min-w-0">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary shrink-0">
                        €{formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  {isFreeDelivery ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>€{formatPrice(DELIVERY_FEE)}</span>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">€{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
