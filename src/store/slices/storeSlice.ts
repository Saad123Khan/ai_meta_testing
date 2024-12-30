import { createSlice } from "@reduxjs/toolkit";
 
export const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    descriptionData: null,
    platformName: <any>{},
    websiteUrl: "",
    adPrompt: "",
    brandName: "",
    generated_suggestions: <any>{},
    targetingChipsAi:<any> [],
  },
  reducers: {
    setDescriptionData: (state, action) => {
      state.descriptionData = action.payload;
    },
    setWebsiteUrl: (state, action) => {
      state.websiteUrl = action.payload;
    },
    setAdPrompt: (state, action) => {
      state.adPrompt = action.payload;
    },
    setBrandName: (state, action) => {
      state.brandName = action.payload;
    },
    setPlatformName: (state, action) => {
      state.platformName = action.payload;
    },
    setGeneratedSuggestionsData: (state, action) => {
      state.generated_suggestions = action.payload;
    },
    addTargetingChipsAi: (state, action) => {
        state.targetingChipsAi = (action.payload);
    },
  },
});

export const {
  setDescriptionData,
  setWebsiteUrl,
  setAdPrompt,
  setBrandName,
  setPlatformName,
  setGeneratedSuggestionsData,
  addTargetingChipsAi
} = storeSlice.actions;

export default storeSlice.reducer;
