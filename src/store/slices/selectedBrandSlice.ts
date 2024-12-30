import { PaginatedResponse } from "@/types/apiResponse";
import { Brand } from "@/types/brand";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface BrandState {
  brand: Brand | null;
}

const initialState: BrandState = {
  brand: null,
};

// Create the slice
const selectedBrandSlice = createSlice({
  name: "selectedBrandSlice",
  initialState,
  reducers: {
    selectBrand(state, action: PayloadAction<Brand>) {
      state.brand = action.payload;
    },
  },
});

// Export actions and reducer
export const { selectBrand } = selectedBrandSlice.actions;
export default selectedBrandSlice.reducer;
