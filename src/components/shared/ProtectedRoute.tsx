import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "@/store/hooks"
import { selectIsAuthenticated } from "@/store/authSlice"

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
