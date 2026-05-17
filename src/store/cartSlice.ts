import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { CartItem } from "@/types"

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

const cartReducer = cartSlice.reducer
export default persistReducer({ key: "cart", storage }, cartReducer)
