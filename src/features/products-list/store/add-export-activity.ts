import { UserData } from "@/shared/types/types";

import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getTime } from "date-fns";

import { setDoc } from "firebase/firestore";

import { query } from "@/shared/api/firebase-config";

export const addExportActivity = createAsyncThunk(
  "@@data/addExportActivity",
  async (user: UserData) => {
    const activityID = nanoid();

    await setDoc(query(`activity/${activityID}`), {
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
