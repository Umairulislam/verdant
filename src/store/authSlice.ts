import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"

interface AuthState {
  user: null | { name: string; email: string }
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

const authReducer = authSlice.reducer
export default persistReducer({ key: "auth", storage }, authReducer)
