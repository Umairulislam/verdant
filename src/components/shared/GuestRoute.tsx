import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "@/store/hooks"
import { selectIsAuthenticated } from "@/store/authSlice"

const GuestRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default GuestRoute
