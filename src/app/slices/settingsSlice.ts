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

      const oldMetaTag =
        document.querySelector('meta[name="theme-color"]') ||
        document.createElement("meta");

      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute("name", "theme-color");

      if (action.payload === "light") {
        newMetaTag.content = "#f8f8f8";
        document.head.replaceChild(newMetaTag, oldMetaTag);
        console.log(1);
      } else {
        newMetaTag.content = "#202020";
        document.head.replaceChild(newMetaTag, oldMetaTag);
        console.log(2);
      }
    },
  },
});

export const { setSelectType, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
