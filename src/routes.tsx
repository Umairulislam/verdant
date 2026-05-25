import { createBrowserRouter } from "react-router"
import RootLayout from "./pages/RootLayout"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Order from "./pages/Order"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/shared/ProtectedRoute"
import GuestRoute from "./components/shared/GuestRoute"
import Profile from "./pages/Profile"

const routes = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "shop/:plantId", Component: ProductDetail },
      {
        Component: GuestRoute,
        children: [
          { path: "sign-in", Component: SignIn },
          { path: "sign-up", Component: SignUp },
        ],
      },
      {
        // Protected routes — redirect to sign-in if not authenticated
        Component: ProtectedRoute,
        children: [
          { path: "cart", Component: Cart },
          { path: "checkout", Component: Checkout },
          { path: "order/:orderId", Component: Order },
          { path: "profile", Component: Profile },
        ],
      },
    ],
  },
])

export default routes
