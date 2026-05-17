import { configureStore } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import cartReducer from "./cartSlice"
import ordersReducer from "./ordersSlice"
import authReducer from "./authSlice"
import plantReducer from "./plantSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
    plant: plantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
