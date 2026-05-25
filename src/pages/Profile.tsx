import { useState } from "react"
import { Link } from "react-router"
import {
  User,
  Mail,
  CalendarDays,
  PackageSearch,
  Search,
  ArrowRight,
  ShoppingBag,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectUser, selectJoinedAt, signOut } from "@/store/authSlice"
import { selectOrders } from "@/store/ordersSlice"
import { formatPrice } from "@/utils/formatPrice"

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
}

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const joinedAt = useAppSelector(selectJoinedAt)
  const orders = useAppSelector(selectOrders)
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="py-10 flex flex-col gap-8">
      <h1 className="text-4xl font-bold">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — User Info */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">Plant Enthusiast</p>
              </div>
            </div>

            <Separator />

            {/* Details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>
                  {joinedAt
                    ? `Joined ${new Date(joinedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`
                    : "Member"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShoppingBag className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>
                  {orders.length} {orders.length === 1 ? "order" : "orders"} placed
                </span>
              </div>
            </div>

            <Separator />

            <Button
              variant="outline"
              className="w-full gap-2 text-red-500 hover:text-red-500"
              onClick={() => dispatch(signOut())}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Right — Order History */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <PackageSearch className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Order History</h2>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order number..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredOrders
                .slice()
                .reverse() // most recent first
                .map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border bg-card p-5 flex flex-col gap-4"
                  >
                    {/* Order Header */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Order</span>
                          <span className="font-mono font-bold tracking-widest">#{order.id}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColor[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <Separator />

                    {/* Items Preview */}
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {order.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                            <span className="text-xs font-medium">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                        </span>
                        <span className="text-muted-foreground">
                          {order.items
                            .map((i) => i.name)
                            .join(", ")
                            .slice(0, 40)}
                          {order.items.map((i) => i.name).join(", ").length > 40 ? "..." : ""}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-lg">
                        €{formatPrice(order.total)}
                      </span>
                      <Link to={`/order/${order.id}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          View Order
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : orders.length === 0 ? (
            // No orders at all
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center rounded-2xl border bg-card">
              <div className="p-4 rounded-full bg-muted">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">No orders yet</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                You haven't placed any orders. Start shopping and your orders will appear here.
              </p>
              <Link to="/shop">
                <Button className="gap-2">
                  Browse Plants
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            // Search returned no results
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center rounded-2xl border bg-card">
              <Search className="h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold">No orders found</h3>
              <p className="text-muted-foreground text-sm">
                No order matches <span className="font-mono font-semibold">#{search}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
