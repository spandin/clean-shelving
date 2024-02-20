import { UserData } from "@/shared/types/types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTime } from "date-fns";

import { deleteDoc, increment, setDoc, updateDoc } from "firebase/firestore";

import { query } from "@/shared/api/firebase-config";

interface Props {
  id: string;
  name: string;
  user: UserData;
}

export const deleteProduct = createAsyncThunk(
  "@@data/deleteProduct",
  async ({ id, name, user }: Props) => {
    try {
      await deleteDoc(query(`data/${id}`));

      await setDoc(query(`activity/${id}`), {
        id: id,
        actioner: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        description: `Удалил - ${name}`,
        madeOn: getTime(new Date()),
      });

      await updateDoc(query(`users/${user.id}`), {
        "actions.deleted": increment(1),
      });
    } catch (e) {
      console.error("DELETE PRODUCT: " + e);
    }
  }
);
