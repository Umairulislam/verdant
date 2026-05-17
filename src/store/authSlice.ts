import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { AuthUser } from "@/types"
import type { RootState } from "./store"

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    signOut: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { signIn, signOut } = authSlice.actions

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user

const authReducer = authSlice.reducer
export default persistReducer({ key: "auth", storage }, authReducer)
