import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInWithEmailAndPassword } from "firebase/auth";
import { DocumentData, getDoc } from "firebase/firestore";

import { auth, query } from "@/shared/api/firebase-config";
import { FirebaseError } from "firebase/app";

interface Props {
  data: { email: string; password: string };
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const signInUser = createAsyncThunk(
  "@@authentication/signIn",
  async ({ data, setError }: Props) => {
    return await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const docSnap: DocumentData = await getDoc(
          query(`users/${userCredential.user.uid}`)
        );

        return docSnap.data();
      })
      .catch((err) => {
        console.error("SIGN-IN: " + err.message);

        err instanceof FirebaseError && setError("SIGN-IN: " + err.message);
      });
  }
);
