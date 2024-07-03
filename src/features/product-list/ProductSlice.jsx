import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: 'idle',
};

const productSlice = createSlice({
  name: "productlist",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = productSlice.actions;
export const selectCount = (state) => state.productlist.value; //to select state value from state or store
export default productSlice.reducer;
