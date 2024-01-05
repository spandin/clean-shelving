import { UserData } from "@/types/types";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
      console.log(`SIGN IN: `, e);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "@@user/signUpUser",
  async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        return userCredential.user;
      });

      return await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        setDoc(doc(db, "users", `${userCredential.user.uid}`), {
          id: userCredential.user.uid,
          name: data.name,
          email: userCredential.user.email,
          role: data.role,
          actions: {
            added: 0,
            updated: 0,
            deleted: 0,
          },
        });

        return userCredential.user;
      });
    } catch (e: any) {
      console.log(`SIGN UP: `, e);
    }
  }
);

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

export const addedActionsUser = createAsyncThunk(
  "@@user/addedActionsUser",
  async (user: UserData) => {
    try {
      await updateDoc(doc(db, "users", `${user.id}`), {
        "actions.added": increment(1),
      });
    } catch (e) {
      console.log("ADD ACTION USER: " + e);
    }
  }
);

export const updatedActionsUser = createAsyncThunk(
  "@@user/updatedActionsUser",
  async (user: UserData) => {
    try {
      await updateDoc(doc(db, "users", `${user.id}`), {
        "actions.updated": increment(1),
      });
    } catch (e) {
      console.log("UPDATED ACTION USER: " + e);
    }
  }
);

export const deletedActionsUser = createAsyncThunk(
  "@@user/deletedActionsUser",
  async (user: UserData) => {
    try {
      await updateDoc(doc(db, "users", `${user.id}`), {
        "actions.deleted": increment(1),
      });
    } catch (e) {
      console.log("DELETED ACTION USER: " + e);
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
        state.isAuth = true;
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
