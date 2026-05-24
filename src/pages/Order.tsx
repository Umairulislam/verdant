import { useParams, Link } from "react-router"
import { CheckCircle2, Package, MapPin, CreditCard, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/store/hooks"
import { selectOrderById } from "@/store/ordersSlice"
import { formatPrice } from "@/utils/formatPrice"

const Order = () => {
  const { orderId } = useParams()
  const order = useAppSelector(selectOrderById(orderId!))

  // Order not found state
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Order not found</h2>
        <p className="text-muted-foreground text-sm">
          We couldn't find order <span className="font-mono font-semibold">#{orderId}</span>
        </p>
        <Link to="/shop">
          <Button>Browse Plants</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-10 flex flex-col gap-8">
      {/* Success Banner */}
      <div className="rounded-2xl bg-primary/10 border border-primary/20 p-8 flex flex-col items-center text-center gap-3">
        <div className="p-3 rounded-full bg-primary/20">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you, <span className="font-medium text-foreground">{order.shipping.fullName}</span>.
          Your plants are on their way.
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Order</span>
          <span className="font-mono font-bold text-lg tracking-widest">#{order.id}</span>
          <Badge variant="secondary" className="capitalize">
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Ordered Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Items Ordered</h2>
          </div>

          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="flex flex-col divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-1 justify-between items-center min-w-0">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground italic truncate">
                        {item.scientificName}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Qty: {item.quantity} × €{formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-primary shrink-0">
                      €{formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="p-4 bg-muted/40 flex justify-between font-bold text-lg">
              <span>Total Paid</span>
              <span className="text-primary">€{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Right — Order Details */}
        <div className="flex flex-col gap-4">
          {/* Shipping */}
          <div className="rounded-2xl border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">Shipping To</h3>
            </div>
            <Separator />
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-medium">{order.shipping.fullName}</p>
              <p className="text-muted-foreground">{order.shipping.email}</p>
              <p className="text-muted-foreground">{order.shipping.phone}</p>
              <p className="text-muted-foreground mt-1">{order.shipping.address}</p>
              <p className="text-muted-foreground">
                {order.shipping.city}, {order.shipping.postcode}
              </p>
              <p className="text-muted-foreground">{order.shipping.country}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">Payment</h3>
            </div>
            <Separator />
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-muted-foreground">Card number</p>
              <p className="font-mono font-medium tracking-widest">{order.cardNumber}</p>
              <p className="text-muted-foreground mt-1">Placed on</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <Link to="/shop">
            <Button className="w-full gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Order
