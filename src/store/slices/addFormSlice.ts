import { createSlice } from "@reduxjs/toolkit";

const addFormSlice = createSlice({
  name: "addForm",
  initialState: {
    selectType: "fullDate",
    shelfTime: 0,
  },
  reducers: {
    setSelectType: (state, action) => {
      state.selectType = action.payload;
    },
    setShelfTime: (state, action) => {
      state.shelfTime = action.payload;
    },
  },
});

export const { setSelectType, setShelfTime } = addFormSlice.actions;

export default addFormSlice.reducer;
