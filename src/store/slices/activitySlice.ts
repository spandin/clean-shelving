import { ActivityState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ActivityState = {
  my: [],
  all: [],
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
});

export default activitySlice.reducer;
