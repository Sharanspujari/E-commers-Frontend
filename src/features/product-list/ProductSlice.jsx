import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductsByFilter,
  fetchSingleProductById,
} from "./ProductAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

// async THunk to call API
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchSingleProductById(id);
    return response.data;
  }
);
// / thunk for to fetch products by filter.
export const fetchProductsByFilterAsync = createAsyncThunk(
  "products/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    return response.data;
  }
);

// thunk for to fetch all the categories list
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategoris",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

// thunk for to fetch all the brand list
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
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
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products; //to select state value from state or store
export const selectCategories = (state) => state.product.categories; //to select state value from state or store
export const selectBrands = (state) => state.product.brands; //to select state value from state or store
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems; //to select state value from state or store

export default productSlice.reducer;
