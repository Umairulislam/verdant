import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "./storage"
import type { AuthUser, StoredUser } from "@/types"
import type { RootState } from "./store"

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  registeredUsers: StoredUser[]
  joinedAt: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  registeredUsers: [],
  joinedAt: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<StoredUser>) => {
      state.registeredUsers.push(action.payload)
      // sign user in immediately after registration
      state.user = { name: action.payload.name, email: action.payload.email }
      state.isAuthenticated = true
      state.joinedAt = new Date().toISOString()
    },
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

export const { signIn, signUp, signOut } = authSlice.actions

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
export const selectRegisteredUsers = (state: RootState) => state.auth.registeredUsers
export const selectJoinedAt = (state: RootState) => state.auth.joinedAt

const authReducer = authSlice.reducer
export default persistReducer({ key: "auth", storage }, authReducer)
