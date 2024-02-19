import { auth, db } from "@/shared/api/firebase-config";

import { signInWithEmailAndPassword } from "firebase/auth";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, doc, getDoc } from "firebase/firestore";

interface Props {
  email: string;
  password: string;
}

export const signInUser = createAsyncThunk(
  "@@authentication/signIn",
  async (data: Props) => {
    try {
      return await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(async (userCredential) => {
        const docSnap: DocumentData = await getDoc(
          doc(db, "users", userCredential.user.uid)
        );

        return docSnap.data();
      });
    } catch (e) {
      console.error(`SIGN IN: `, e);
    }
  }
);
