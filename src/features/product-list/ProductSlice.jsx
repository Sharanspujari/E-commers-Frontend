import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilter } from "./ProductAPI";

const initialState = {
  products: [],
  status: "idle",
};

// async THunk to call API
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "products/fetchProductsByFilter",
  async ({filter,sort}) => {
    const response = await fetchProductsByFilter(filter,sort);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products; //to select state value from state or store
export default productSlice.reducer;
