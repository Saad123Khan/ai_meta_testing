import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for persistence
import userReducer from "../store/slices/userSlice";
import storeSlice from "./slices/storeSlice";
import imageReducer from "./slices/imageSlice";
import addsReducer from "./slices/addSlice";
import brandReducer from "./slices/brandSlice";
import selectedBrandReducer from "./slices/selectedBrandSlice";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Combine all reducers
const rootReducer = combineReducers({
    user: userReducer,
    reduxStore: storeSlice,
    image: imageReducer,
    adds:addsReducer,
    brand: brandReducer,
    selectedBrand: selectedBrandReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage, // Use localStorage for persistence
  whitelist: ["reduxStore", "image","adds", "selectedBrand" ,"user"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: true,
  });
}

// Initialize store and persistor with proper type handling
let store: ReturnType<typeof makeStore>;
let persistor: Persistor | null;

if (typeof window !== "undefined") {
  store = makeStore();
  persistor = persistStore(store);
} else {
  store = makeStore(); // Initialize without persistence
  persistor = null; // No persistor on server-side
}

export { store, persistor };

// Types for RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define a type for async actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
