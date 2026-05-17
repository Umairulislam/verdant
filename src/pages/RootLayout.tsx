import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header will go here */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer will go here */}
    </div>
  )
}

export default RootLayout
