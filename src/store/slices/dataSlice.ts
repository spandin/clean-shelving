import { AddFormInputsType, DataState } from "@/types/types";

import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import { db } from "@/lib/firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { getTime } from "date-fns";
import { stringToTimestamp } from "@/lib/date";

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
      code: parseInt(data.code),
      category: data.category,
      quantity: parseInt(data.quantity),
      dates: {
        createdAt: getTime(new Date()),
        mfd: stringToTimestamp(data.dates.mfd),
        exp: stringToTimestamp(data.dates.exp),
      },
      actions: {
        created: {
          createdAt: getTime(new Date()),
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
