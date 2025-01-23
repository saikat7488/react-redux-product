import { createSlice } from "@reduxjs/toolkit";

const userActionSlice = createSlice({
  name: "userAction",
  initialState: {
    actionCount: 0,
    actionLimit: 50,
    isActionLimitReached: false,
  },
  reducers: {
    incrementActionCount: (state) => {
      state.actionCount += 1;
      if (state.actionCount >= state.actionLimit) {
        state.isActionLimitReached = true;
      } else {
        state.isActionLimitReached = false;
      }
    },
  },
});

export const { incrementActionCount } = userActionSlice.actions;
export default userActionSlice.reducer;
