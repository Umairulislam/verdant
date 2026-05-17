import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { CartItem, Plant } from "@/types"
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
  reducers: {
    addItem: (state, action: PayloadAction<Plant>) => {
      const match = state.items.find((item) => item.id === action.payload.id)
      if (!match) {
        state.items.push({ ...action.payload, quantity: 1 })
      } else {
        match.quantity++
      }
    },
  },
})

export const { addItem } = cartSlice.actions

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0)

const cartReducer = cartSlice.reducer
export default persistReducer({ key: "cart", storage }, cartReducer)
