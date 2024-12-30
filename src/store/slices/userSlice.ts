import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for your state
interface UserState {
  user: any | null; // Adjust this to a more specific type depending on your user object
  loading: boolean;
}

// Define the initial state with a type
const initialState: UserState = {
  user: null,
  loading: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => { // Typing the action's payload
      state.user = action.payload;
    },
    setLogout: (state) => { 
      state.user = null;
    },
    // You can add other reducers as needed
  },
});

// Export actions for use in components or dispatch
export const { setUser ,setLogout } = userSlice.actions;

// Export the reducer to be used in your store
export default userSlice.reducer;
