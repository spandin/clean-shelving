import {
  AddFormInputsType,
  DataState,
  ProductType,
  UserData,
} from "@/types/types";

import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import { db } from "@/lib/firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getTime } from "date-fns";
import { stringToTimestamp } from "@/lib/date";

export const getProducts = createAsyncThunk("@@data/getProducts", async () => {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data: ProductType[] = querySnapshot.docs.map((doc: DocumentData) =>
    doc.data()
  );

  return data;
});

export const getActivity = createAsyncThunk("@@data/getActivity", async () => {
  const querySnapshot = await getDocs(collection(db, "activity"));
  const data = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return data;
});

export const addProduct = createAsyncThunk(
  "@@data/addProduct",
  async ({ data, user }: { data: AddFormInputsType; user: UserData }) => {
    const id = nanoid();

    await setDoc(doc(db, "data", id), {
      id: id,
      name: data.name,
      code: parseInt(data.code),
      category: data.category,
      quantity: parseInt(data.quantity),
      dates: {
        createdAt: getTime(new Date()),
        mfd: stringToTimestamp(data.dates.mfd),
        exp: stringToTimestamp(data.dates.exp),
      },
      actions: {
        created: {
          createdAt: getTime(new Date()),
          whoCreated: user.name,
          whoCreatedID: user.id,
        },
        exported: {
          isExported: false,
        },
      },
    });

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
      description: `Добавил - ${data.name}`,
      madeOn: getTime(new Date()),
    });
  }
);

export const updateProduct = createAsyncThunk(
  "@@data/updateProduct",
  async ({
    id,
    data,
    user,
  }: {
    id: string;
    data: ProductType | DocumentData;
    user: UserData;
  }) => {
    try {
      const products = await getDocs(collection(db, "data"));
      for (const snap of products.docs) {
        if (snap.id === id) {
          await updateDoc(doc(db, "data", snap.id), {
            name: data.name,
            code: data.code,
            category: data.category,
            quantity: data.quantity,
            dates: {
              mfd: stringToTimestamp(data.dates.mfd),
              exp: stringToTimestamp(data.dates.exp),
            },
            "actions.exported.isExported": false,
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
    } catch (e) {
      console.log("UPDATE PRODUCT: " + e);
    }

    return { id, data, user };
  }
);

export const getBarcodes = createAsyncThunk("@@data/getBarcodes", async () => {
  const querySnapshot = await getDocs(collection(db, "barcodes"));
  const barcodes = querySnapshot.docs.map((doc: DocumentData) => doc.data());

  return barcodes;
});

export const setBarcodes = createAsyncThunk(
  "@@data/setBarcodes",
  async (data: DocumentData) =>
    await setDoc(doc(db, "barcodes", data.code), {
      code: data.code,
      name: data.name,
      category: data.category,
    })
);

export const updateProductMark = createAsyncThunk(
  "@@data/updateProductMark",
  async ({ id, user }: { id: string; user: UserData }) => {
    const products = await getDocs(collection(db, "data"));
    for (const snap of products.docs) {
      if (snap.id === id) {
        await updateDoc(doc(db, "data", snap.id), {
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

export const setExportActivity = createAsyncThunk(
  "@@data/setExportActivity",
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

const initialState: DataState = {
  products: [],
  barcodes: [],
  activity: [],
  filter: {
    category: "Все",
    exported: "Все",
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filter.category = action.payload;
    },
    setExported: (state, action) => {
      state.filter.exported = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.activity = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Updates in the products store
        const productIndex = state.products.findIndex(
          (post) => post.id == action.payload.id
        );
        state.products[productIndex].name = action.payload.data.name;
        state.products[productIndex].category = action.payload.data.category;
        state.products[productIndex].code = action.payload.data.code;
        state.products[productIndex].quantity = action.payload.data.quantity;
        state.products[productIndex].dates.mfd = action.payload.data.dates.mfd;
        state.products[productIndex].dates.exp = action.payload.data.dates.exp;
        state.products[productIndex].actions.exported.isExported = false;
        state.products[productIndex].actions.updated.isUpdated = true;

        // Updates in the activity store
        const activityIndex = state.activity.findIndex(
          (activity) => activity.id == action.payload.id
        );
        state.activity[activityIndex].id = action.payload.id;
        state.activity[activityIndex].actioner.name = action.payload.user.name;
        state.activity[activityIndex].actioner.email =
          action.payload.user.email;
        state.activity[activityIndex].actioner.id = action.payload.user.id;
        state.activity[
          activityIndex
        ].description = `Обновил - ${action.payload.data.name}`;
        state.activity[activityIndex].madeOn = getTime(new Date());
      })
      .addCase(getBarcodes.fulfilled, (state, action) => {
        state.barcodes = action.payload;
      })
      .addCase(updateProductMark.fulfilled, (state, action) => {
        const productIndex = state.products.findIndex(
          (post) => post.id == action.payload
        );
        state.products[productIndex].actions.exported.isExported = true;
      });
  },
});

export const { setCategory, setExported } = dataSlice.actions;

export default dataSlice.reducer;
