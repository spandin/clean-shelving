import { UserData } from "@/shared/types/types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTime } from "date-fns";

import { collection, getDocs, updateDoc } from "firebase/firestore";

import { db, query } from "@/shared/api/firebase-config";

export const changeExportState = createAsyncThunk(
  "@@data/changeExportState",
  async ({ id, user }: { id: string; user: UserData }) => {
    const products = await getDocs(collection(db, "data"));
    for (const snap of products.docs) {
      if (snap.id === id) {
        await updateDoc(query(`activity/${snap.id}`), {
          "actions.exported.isExported": true,
          "actions.exported.exportedOn": getTime(new Date()),
          "actions.exported.whoExported": user.name,
          "actions.exported.whoExportedID": user.id,
        });
      }
    }

    return id;
  }
);
