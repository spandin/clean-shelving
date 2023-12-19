import { AddFormInputsType, BarcodeType, ProductType } from "@/types/types";

import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import { db } from "@/lib/firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const getProducts = createAsyncThunk("@@data/getProducts", async () => {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return data;
});

export const addProduct = createAsyncThunk(
  "@@data/addProduct",
  async ({
    data,
    email,
  }: {
    data: AddFormInputsType;
    email: string | null;
  }) => {
    const id = nanoid();
    await setDoc(doc(db, "data", id), {
      id: id,
      name: data.name,
      code: data.code,
      category: data.category,
      quantity: data.quantity,
      dates: {
        createdAt: new Date().toLocaleDateString("ru-Ru"),
        mfd: data.dates.mfd,
        exp: data.dates.exp,
      },
      actions: {
        created: {
          createdAt: new Date().toLocaleDateString("ru-Ru"),
          whoCreated: email,
        },
        exported: {
          isExported: false,
        },
      },
    });
  }
);

export const getBarcodes = createAsyncThunk("@@data/getBarcodes", async () => {
  const querySnapshot = await getDocs(collection(db, "barcodes"));
  const barcodes = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return barcodes;
});

export const setBarcodes = createAsyncThunk(
  "@@data/setBarcodes",
  async (data: DocumentData) =>
    await setDoc(doc(db, "barcodes", data.code), {
      code: data.code,
      name: data.name,
      category: data.category,
    })
);

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
