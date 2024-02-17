import { UserData } from "@/shared/types/types";

import { createSlice } from "@reduxjs/toolkit";

import { signInUser } from "@/features/authentication/login/store/thunk";
import { signUpUser } from "@/features/authentication/register/store/thunk";

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
      });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
