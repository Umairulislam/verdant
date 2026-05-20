import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-7xl px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
