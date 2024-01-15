import { UserData } from "@/types/types";

import { db } from "@/shared/api/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signInUser } from "@/features/authentication/login/model/signInAsyncThunk";
import { signUpUser } from "@/features/authentication/register/model/signUpAsyncThunk";

export const getUserInfo = createAsyncThunk(
  "@@user/getUserInfo",
  async (id: string) => {
    try {
      const docSnap = await getDoc(doc(db, "users", `${id}`));

      return docSnap.data();
    } catch (e) {
      console.log("GET USER INFO: " + e);
    }
  }
);

const initialState: UserData = {
  id: null,
  name: "Гость",
  email: null,
  role: "Гость",
  isAuth: false,
  actions: {
    added: 0,
    updated: 0,
    deleted: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.email = action.payload ? action.payload.email : null;
        state.id = action.payload ? action.payload.uid : null;
        state.isAuth = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.email = action.payload ? action.payload.email : null;
        state.id = action.payload ? action.payload.uid : null;
        state.isAuth = action.payload ? !!action.payload.email : false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.name = action.payload?.name;
        state.role = action.payload?.role;
        state.actions = action.payload?.actions;
      });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
