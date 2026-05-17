import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { Order } from "@/types"

interface OrderState {
  items: Order[]
}

const initialState: OrderState = {
  items: [],
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
})

const ordersReducer = ordersSlice.reducer
export default persistReducer({ key: "orders", storage }, ordersReducer)
