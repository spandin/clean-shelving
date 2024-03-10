import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInWithEmailAndPassword } from "firebase/auth";
import { DocumentData, getDoc } from "firebase/firestore";

import { auth, query } from "@/shared/api/firebase-config";

interface Props {
  email: string;
  password: string;
}

export const signInUser = createAsyncThunk(
  "@@authentication/signIn",
  async (data: Props) => {
    return await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const docSnap: DocumentData = await getDoc(
          query(`users/${userCredential.user.uid}`)
        );

        return docSnap.data();
      })
      .catch((err) => console.error(err));
  }
);
