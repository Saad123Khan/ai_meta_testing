import { PaginatedResponse } from "@/types/apiResponse";
import { Brand } from "@/types/brand";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface BrandState {
  brands: PaginatedResponse<Brand> ;
}

const initialState: BrandState = {
  brands: {
    current_page: 1,
    data: [],
    first_page_url: "",
    from: 1,
    next_page_url: null,
    path: "",
    per_page: 10,
    prev_page_url: null,
    to: 0,
  },
};

// Create the slice
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<PaginatedResponse<Brand>>) {
      state.brands = action.payload;
    },
  },
});

// Export actions and reducer
export const { setBrands } = brandSlice.actions;
export default brandSlice.reducer;
