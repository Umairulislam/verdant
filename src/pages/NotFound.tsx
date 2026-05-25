import { Link, useRouteError, isRouteErrorResponse } from "react-router"
import { Leaf, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "The page you're looking for doesn't exist."

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
      <div className="p-5 rounded-full bg-primary/10">
        <Leaf className="h-12 w-12 text-primary" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">{message}</p>
      </div>

      <div className="flex gap-3">
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline">Browse Plants</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
