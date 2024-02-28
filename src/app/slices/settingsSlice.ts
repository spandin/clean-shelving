import { createSlice } from "@reduxjs/toolkit";

interface settingsState {
  selectType: string;
  theme: string;
}

const initialState: settingsState = {
  selectType: "date",
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSelectType: (state, action) => {
      state.selectType = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      document.body.setAttribute("data-theme", action.payload);
    },
  },
});

export const { setSelectType, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
