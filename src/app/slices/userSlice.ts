import { UserData } from "@/shared/types/types";

import { createSlice } from "@reduxjs/toolkit";

import { signInUser } from "@/features/authentication/login/store/thunk";
import { signUpUser } from "@/features/authentication/register/store/thunk";

const initialState: UserData = {
  id: null,
  name: null,
  email: null,
  role: "Guest",
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
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = "Guest";
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isAuth = !!action.payload.email;
        state.actions = action.payload.actions;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isAuth = !!action.payload.email;
        state.actions = action.payload.actions;
      });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
