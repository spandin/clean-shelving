import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/shared/api/firebase-config";

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
      ).then(async (userCredential) => {
        await setDoc(doc(db, "users", `${userCredential.user.uid}`), {
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
      });

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
      console.error(`SIGN UP: `, e);
    }
  }
);
