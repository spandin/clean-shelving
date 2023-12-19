import { BarcodeType, ProductType } from "@/types/types";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "@/lib/firebase";
import { DocumentData, collection, getDocs } from "firebase/firestore";

export const getProducts = createAsyncThunk("@@posts/getProducts", async () => {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return data;
});

export const getBarcodes = createAsyncThunk("@@posts/getBarcodes", async () => {
  const querySnapshot = await getDocs(collection(db, "barcodes"));
  const barcodes = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return barcodes;
});

interface DataState {
  products: ProductType[];
  barcodes: BarcodeType[];
}

const initialState: DataState = {
  products: [],
  barcodes: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getBarcodes.fulfilled, (state, action) => {
        state.barcodes = action.payload;
      });
  },
});

export default dataSlice.reducer;
