import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0, // time in milliseconds
  running: false,
};

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState,
  reducers: {
    start(state) {
      state.running = true;
    },
    stop(state) {
      state.running = false;
    },
    reset(state) {
      state.time = 0;
      state.running = false;
    },
    tick(state) {
      if (state.running) {
        state.time += 10; // Increment time by 10ms
      }
    },
  },
});

export const { start, stop, reset, tick } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;
