import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { Order } from "@/types"
import type { RootState } from "./store"

interface OrderState {
  items: Order[]
}

const initialState: OrderState = {
  items: [],
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      // Mask all digits except last 4 before saving
      const masked = action.payload.cardNumber
        .replace(/\s/g, "")
        .replace(/\d(?=\d{4})/g, "*")
        .replace(/(.{4})/g, "$1 ")
        .trim()

      state.items.push({ ...action.payload, cardNumber: masked })
    },
  },
})

export const { createOrder } = ordersSlice.actions

export const selectOrders = (state: RootState) => state.orders.items
export const selectOrderById = (id: string) => (state: RootState) =>
  state.orders.items.find((order) => order.id === id)

const ordersReducer = ordersSlice.reducer
export default persistReducer({ key: "orders", storage }, ordersReducer)
