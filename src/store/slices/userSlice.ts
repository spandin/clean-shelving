import { UserData } from "@/types/types";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
  "@@user/signInUser",
  async (data: { email: string; password: string }) => {
    try {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          return userCredential.user;
        }
      );
    } catch (e: any) {
      console.log(`SIGN IN`, e.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "@@user/getUserInfo",
  async (id: string) => {
    const docSnap = await getDoc(doc(db, "users", `${id}`));

    return docSnap.data();
  }
);

const initialState: UserData = {
  id: null,
  name: "Гость",
  email: null,
  isAuth: false,
  actions: {
    added: 0,
    updated: 0,
    deleted: 0,
  },
  activity: [],
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
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.name = action.payload?.name;
        state.actions = action.payload?.actions;
        state.activity = action.payload?.activity;
      });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
