import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlatformData } from "@/types/platform";


interface PlatformState {
  platforms: PlatformData[];
  selectedPlatform: PlatformData | null;

}

const initialState: PlatformState = {
  platforms: [],
  selectedPlatform: null,
};

const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    clearPlatforms(state) {
      state.platforms = [];
    },
    setPlatforms(state, action: PayloadAction<PlatformData[]>) {
        state.platforms = action.payload;
    },
    selectPlatform(state, action: PayloadAction<PlatformData>) {
        state.selectedPlatform = action.payload;
    },
  },
});

export const { clearPlatforms, setPlatforms, selectPlatform } = platformSlice.actions;
export default platformSlice.reducer;
