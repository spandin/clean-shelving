import { UserData } from "@/shared/types/types";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "@/shared/api/firebase-config";
import {
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getTime } from "date-fns";

interface Props {
  id: string;
  name: string;
  user: UserData;
}

export const deleteProduct = createAsyncThunk(
  "@@data/deleteProduct",
  async ({ id, name, user }: Props) => {
    try {
      await deleteDoc(doc(db, "data", id));

      await setDoc(doc(db, "activity", id), {
        id: id,
        actioner: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        description: `Удалил - ${name}`,
        madeOn: getTime(new Date()),
      });

      await updateDoc(doc(db, "users", `${user.id}`), {
        "actions.deleted": increment(1),
      });
    } catch (e) {
      console.error("DELETE PRODUCT: " + e);
    }
  }
);
