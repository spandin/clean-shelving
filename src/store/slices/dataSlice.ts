import {
  AddFormInputsType,
  DataState,
  UpdateFormInputsType,
} from "@/types/types";

import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import { db } from "@/lib/firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
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

export const updateProduct = createAsyncThunk(
  "@@data/updateProduct",
  async ({
    id,
    data,
    email,
  }: {
    id: string;
    data: UpdateFormInputsType;
    email: string | null;
  }) => {
    const posts = await getDocs(collection(db, "data"));
    for (const snap of posts.docs) {
      if (snap.id === id) {
        await updateDoc(doc(db, "data", snap.id), {
          name: data.name,
          code: data.code,
          category: data.category,
          quantity: data.quantity,
          dates: {
            mfd: stringToTimestamp(data.dates.mfd),
            exp: stringToTimestamp(data.dates.exp),
          },
          actions: {
            exported: {
              isExported: false,
            },
            updated: {
              updatedAt: getTime(new Date()),
              isUpdated: true,
              whoUpdated: email,
              whoUpdatedID: id,
            },
          },
        });
      }
    }

    await setDoc(doc(db, "products", data.code), {
      code: data.code,
      name: data.name,
      category: data.category,
    });

    return { id, data, email };
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
      .addCase(updateProduct.fulfilled, (state, action) => {
        const postIndex = state.products.findIndex(
          (post) => post.id == action.payload.id
        );
        state.products[postIndex].name = action.payload.data.name;
        state.products[postIndex].category = action.payload.data.category;
        state.products[postIndex].code = action.payload.data.code;
        state.products[postIndex].quantity = action.payload.data.quantity;
        state.products[postIndex].dates.mfd = action.payload.data.dates.mfd;
        state.products[postIndex].dates.exp = action.payload.data.dates.exp;
        state.products[postIndex].actions.exported.isExported = false;
        state.products[postIndex].actions.updated.isUpdated = true;
      })
      .addCase(getBarcodes.fulfilled, (state, action) => {
        state.barcodes = action.payload;
      });
  },
});

export default dataSlice.reducer;
