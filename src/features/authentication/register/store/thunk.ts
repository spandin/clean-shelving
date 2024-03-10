import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DocumentData, getDoc, setDoc } from "firebase/firestore";

import { auth, query } from "@/shared/api/firebase-config";

interface Props {
  email: string;
  password: string;
  name: string;
  role: string;
}

export const signUpUser = createAsyncThunk(
  "@@authentication/signUp",
  async (data: Props) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        await setDoc(query(`users/${userCredential.user.uid}`), {
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
      })
      .catch((err) => console.error(err));

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
