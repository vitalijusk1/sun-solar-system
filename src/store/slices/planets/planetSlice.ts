import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PlanetState {
  selectedPlanetId: number;
  sundId: number;
}

const initialState: PlanetState = {
  selectedPlanetId: -1, // -1 represents the Sun
  sundId: -1,
};

const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    setSelectedPlanet: (state, action: PayloadAction<number>) => {
      state.selectedPlanetId = action.payload;
    },
  },
});

export const { setSelectedPlanet } = planetSlice.actions;
export default planetSlice.reducer;
