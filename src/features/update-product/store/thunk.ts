import { ProductType } from "@/shared/types/types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTime } from "date-fns";

import {
  DocumentData,
  collection,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { stringToTimestamp } from "@/shared/helpers/date";
import { db, query } from "@/shared/api/firebase-config";

interface Props {
  id: string;
  data: ProductType | DocumentData;
  user: DocumentData;
}

export const updateProduct = createAsyncThunk(
  "@@data/updateProduct",
  async ({ id, data, user }: Props) => {
    try {
      const products = await getDocs(collection(db, "data"));
      for (const snap of products.docs) {
        if (snap.id === id) {
          await updateDoc(query(`data/${snap.id}`), {
            name: data.name,
            code: parseInt(data.code),
            category: data.category,
            quantity: parseInt(data.quantity),
            dates: {
              createdAt: getTime(new Date()),
              mfd: stringToTimestamp(data.dates.mfd),
              exp: stringToTimestamp(data.dates.exp),
            },
            "actions.updated.updatedAt": getTime(new Date()),
            "actions.updated.isUpdated": true,
            "actions.updated.whoUpdated": user.name,
            "actions.updated.whoUpdatedID": user.id,
          });
        }
      }

      await setDoc(query(`barcodes/${data.code}`), {
        code: data.code,
        name: data.name,
        category: data.category,
      });

      await setDoc(query(`activity/${id}`), {
        id: id,
        actioner: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        description: `Обновил - ${data.name}`,
        madeOn: getTime(new Date()),
      });

      await updateDoc(query(`users/${user.id}`), {
        "actions.updated": increment(1),
      });
    } catch (e) {
      console.error("UPDATE PRODUCT: " + e);
    }

    return { id, data, user };
  }
);
