import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { CartItem } from "@/types"
import type { RootState } from "./store"

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
})

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0)

const cartReducer = cartSlice.reducer
export default persistReducer({ key: "cart", storage }, cartReducer)
