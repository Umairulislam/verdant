import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./store/store"
import routes from "./routes"
import { Toaster } from "sonner"

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
        <Toaster richColors position="bottom-right" />
      </PersistGate>
    </Provider>
  )
}

export default App
