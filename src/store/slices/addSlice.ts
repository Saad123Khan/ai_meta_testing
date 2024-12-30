import { AdData } from "@/types/Ad";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for your state
interface AddState {
  adds: AdData | null; // Adjust this to a more specific type depending on your user object
  loading: boolean;
  }

// Define the initial state with a type
const initialState: AddState = {
  adds: null,
  loading: false
};

const addSlice = createSlice({
  name: "adds",
  initialState,
  reducers: {
    setAdds: (state, action: PayloadAction<AdData>) => { // Typing the action's payload
      state.adds = action.payload;
    },
    // You can add other reducers as needed
  },
});

// Export actions for use in components or dispatch
export const { setAdds } = addSlice.actions;

// Export the reducer to be used in your store
export default addSlice.reducer;
