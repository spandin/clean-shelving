import { AddFormInputsType, UserData } from "@/shared/types/types";

import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { increment, setDoc, updateDoc } from "firebase/firestore";

import { addMonths, getTime } from "date-fns";
import { query } from "@/shared/api/firebase-config";
import { stringToTimestamp, stringToUTC } from "@/shared/helpers/parse-date";

interface Props {
  data: AddFormInputsType;
  currentUser: UserData;
  selectType: string;
}

export const addProduct = createAsyncThunk(
  "@@data/addProduct",
  async ({ data, currentUser, selectType }: Props) => {
    const id = nanoid();

    try {
      // Создание обьекта продукта в firestore/data
      await setDoc(query(`data/${id}`), {
        id: id,
        name: data.name,
        code: parseInt(data.code),
        category: data.category,
        quantity: parseInt(data.quantity),
        dates: {
          createdAt: getTime(new Date()),
          mfd: stringToTimestamp(data.dates.mfd),
          exp:
            selectType === "date"
              ? stringToTimestamp(data.dates.exp)
              : getTime(
                  addMonths(
                    stringToUTC(data.dates.mfd),
                    parseInt(data.dates.exp)
                  )
                ),
        },
        actions: {
          created: {
            createdAt: getTime(new Date()),
            whoCreated: currentUser.name,
            whoCreatedID: currentUser.id,
          },
          updated: {
            isUpdated: false,
            whoUpdated: null,
            whoUpdatedID: null,
            updatedAt: null,
          },
          exported: {
            isExported: false,
          },
        },
      });

      // Создание обьекта штрихкода в firestore/barcodes
      await setDoc(query(`barcodes/${data.code}`), {
        code: data.code,
        name: data.name,
        category: data.category,
      });

      // Создание обьекта активности в firestore/activity
      await setDoc(query(`activity/${id}`), {
        id: id,
        actioner: {
          name: currentUser.name,
          email: currentUser.email,
          id: currentUser.id,
        },
        description: `Добавил - ${data.name}`,
        madeOn: getTime(new Date()),
      });

      // Инкримирование числа активности(добавления) юзера в firestore/users/userId
      await updateDoc(query(`users/${currentUser.id}`), {
        "actions.added": increment(1),
      });
    } catch (e) {
      console.error("ADD PRODUCT: " + e);
    }
  }
);
