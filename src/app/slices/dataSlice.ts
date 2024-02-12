import { DataState, ProductType } from "@/shared/types/types";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, getDocs } from "firebase/firestore";

import { getTime } from "date-fns";

import { updateProduct } from "@/features/product/update-product/model/updateProductAsyncThunk";
import { changeExportState } from "@/features/products-list/model/change-export-state";

export const getProducts = createAsyncThunk("@@data/getProducts", async () => {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data: ProductType[] = querySnapshot.docs.map((doc: DocumentData) =>
    doc.data()
  );

  return data;
});

export const getUsers = createAsyncThunk("@@data/getUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return users;
});

export const getBarcodes = createAsyncThunk("@@data/getBarcodes", async () => {
  const querySnapshot = await getDocs(collection(db, "barcodes"));
  const barcodes = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return barcodes;
});

export const getActivity = createAsyncThunk("@@data/getActivity", async () => {
  const querySnapshot = await getDocs(collection(db, "activity"));
  const data = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return data.sort((a, b) => +new Date(b.madeOn) - +new Date(a.madeOn));
});

const initialState: DataState = {
  products: [],
  users: [],
  barcodes: [],
  activity: [],
  filter: {
    category: "Все",
    exported: "Все",
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filter.category = action.payload;
    },
    setExported: (state, action) => {
      state.filter.exported = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Updates in the products store
        const productIndex = state.products.findIndex(
          (post) => post.id == action.payload.id
        );
        state.products[productIndex].name = action.payload.data.name;
        state.products[productIndex].category = action.payload.data.category;
        state.products[productIndex].code = action.payload.data.code;
        state.products[productIndex].quantity = action.payload.data.quantity;
        state.products[productIndex].dates.mfd = action.payload.data.dates.mfd;
        state.products[productIndex].dates.exp = action.payload.data.dates.exp;
        state.products[productIndex].actions.exported.isExported = false;
        state.products[productIndex].actions.updated.isUpdated = true;

        // Updates in the activity store
        const activityIndex = state.activity.findIndex(
          (activity) => activity.id == action.payload.id
        );
        state.activity[activityIndex].id = action.payload.id;
        state.activity[activityIndex].actioner.name = action.payload.user.name;
        state.activity[activityIndex].actioner.email =
          action.payload.user.email;
        state.activity[activityIndex].actioner.id = action.payload.user.id;
        state.activity[
          activityIndex
        ].description = `Обновил - ${action.payload.data.name}`;
        state.activity[activityIndex].madeOn = getTime(new Date());
      })
      .addCase(changeExportState.fulfilled, (state, action) => {
        const productIndex = state.products.findIndex(
          (post) => post.id == action.payload
        );
        state.products[productIndex].actions.exported.isExported = true;
      })
      .addCase(getBarcodes.fulfilled, (state, action) => {
        state.barcodes = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.activity = action.payload;
      });
  },
});

export const { setCategory, setExported } = dataSlice.actions;

export default dataSlice.reducer;
