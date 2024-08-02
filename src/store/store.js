import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import favouritesReducer from "./favouritesSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    favourites: favouritesReducer,
  },
});
