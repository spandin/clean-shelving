import { ProductType, UserData } from "@/types/types";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "@/shared/api/firebase-config";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getTime } from "date-fns";
import { stringToTimestamp } from "@/shared/helpers/parse-date";

interface Props {
  id: string;
  data: ProductType | DocumentData;
  user: UserData;
}

export const updateProduct = createAsyncThunk(
  "@@data/updateProduct",
  async ({ id, data, user }: Props) => {
    try {
      const products = await getDocs(collection(db, "data"));
      for (const snap of products.docs) {
        if (snap.id === id) {
          await updateDoc(doc(db, "data", snap.id), {
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

      await setDoc(doc(db, "barcodes", data.code), {
        code: data.code,
        name: data.name,
        category: data.category,
      });

      await setDoc(doc(db, "activity", id), {
        id: id,
        actioner: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        description: `Обновил - ${data.name}`,
        madeOn: getTime(new Date()),
      });

      await updateDoc(doc(db, "users", `${user.id}`), {
        "actions.updated": increment(1),
      });
    } catch (e) {
      console.log("UPDATE PRODUCT: " + e);
    }

    return { id, data, user };
  }
);
