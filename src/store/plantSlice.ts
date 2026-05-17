import { createSlice } from "@reduxjs/toolkit"

interface PlantState {
  selectedFilter: string
}

const initialState: PlantState = {
  selectedFilter: "all",
}

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
})

export default plantSlice.reducer
