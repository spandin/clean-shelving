import { createSlice } from "@reduxjs/toolkit";

const addFormSlice = createSlice({
  name: "addForm",
  initialState: {
    selectType: "date",
  },
  reducers: {
    setSelectType: (state, action) => {
      state.selectType = action.payload;
    },
  },
});

export const { setSelectType } = addFormSlice.actions;

export default addFormSlice.reducer;
