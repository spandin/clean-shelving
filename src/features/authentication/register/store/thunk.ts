import { createAsyncThunk } from "@reduxjs/toolkit";

import { auth, db } from "@/shared/api/firebase-config";
import { doc, setDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface Props {
  email: string;
  password: string;
  name: string;
  role: string;
}

export const signUpUser = createAsyncThunk(
  "@@authentication/signUp",
  async (data: Props) => {
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
      console.error(`SIGN UP: `, e);
    }
  }
);
