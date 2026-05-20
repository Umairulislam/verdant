import type { Plant } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface PlantState {
  selectedPlant: Plant | null
}

const initialState: PlantState = {
  selectedPlant: null,
}

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    setSelectedPlant: (state, action: PayloadAction<Plant>) => {
      state.selectedPlant = action.payload
    },
  },
})

export const { setSelectedPlant } = plantSlice.actions
export const selectSelectedPlant = (state: RootState) => state.plant.selectedPlant

export default plantSlice.reducer
