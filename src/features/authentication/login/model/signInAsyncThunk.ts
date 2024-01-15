import { auth } from "@/shared/api/firebase-config";

import { signInWithEmailAndPassword } from "firebase/auth";

import { createAsyncThunk } from "@reduxjs/toolkit";

interface Props {
  email: string;
  password: string;
}

export const signInUser = createAsyncThunk(
  "@@authentication/signIn",
  async (data: Props) => {
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
