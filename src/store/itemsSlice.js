import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allItems: [],
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setAllItems(state, action) {
      state.allItems = action.payload;
      state.items = action.payload;
    },
  },
});

export const { setItems, setAllItems } = itemsSlice.actions;
export default itemsSlice.reducer;
