import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action) {
      if (state.favourites.length < 5) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
