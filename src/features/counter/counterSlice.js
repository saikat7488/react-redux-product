import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    userAction: 0,
  },
  reducers: {
    increment: (state) => {
      return {
        ...state,
        count: state.count + 1,
        userAction: state.userAction + 1,
      };
    },

    decrement: (state) => {
      return {
        ...state,
        count: state.count - 1,
        userAction: state.userAction + 1,
      };
    },

    increment_by_value: (state, action) => {
      return {
        ...state,
        count: state.count + Number(action.payload),
        userAction: state.userAction + 1,
      };
    },

    decrement_by_value: (state, action) => {
      return {
        ...state,
        count: state.count - Number(action.payload),
        userAction: state.userAction + 1,
      };
    },
    reset: (state) => {
      return {
        ...state,
        count: 0,
        userAction: state.userAction + 1,
      };
    },
  },
});

export const {
  increment,
  decrement,
  increment_by_value,
  decrement_by_value,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
