import { UserData } from "@/types/types";

import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getTime } from "date-fns";

import { db } from "@/shared/api/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export const addExportActivity = createAsyncThunk(
  "@@data/addExportActivity",
  async (user: UserData) => {
    const activityID = nanoid();
    await setDoc(doc(db, "activity", activityID), {
      id: activityID,
      actioner: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      description: `Экспортировал файл`,
      madeOn: getTime(new Date()),
    });
  }
);
