import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 300000, // Initial time in milliseconds (e.g., 5 minutes = 300000ms)
  running: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer(state) {
      state.running = true;
    },
    stopTimer(state) {
      state.running = false;
    },
    resetTimer(state) {
      state.time = 300000; // Reset to initial time (5 minutes in ms)
      state.running = false;
    },
    decrementTime(state) {
      if (state.running && state.time > 0) {
        state.time -= 10; // Decrement time by 10ms (each tick)
      }
    },
    // setCustomTime(state, action) {
    //   const { hours, minutes, seconds, milliseconds } = action.payload;
    //   console.log(
    //     "SetCustomTimer : hours, minutes, seconds, milliseconds",
    //     hours,
    //     minutes,
    //     seconds,
    //     milliseconds
    //   );
    //   state.time =
    //     (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds; // Convert time to milliseconds
    //   console.log("By Setting Time", state.time);
    //   state.running = false; // Stop the timer initially
    // },

    setCustomTime(state, action) {
      const { hours, minutes, seconds, milliseconds } = action.payload;

      // Ensure all values are numbers
      const hoursValue = Number(hours);
      const minutesValue = Number(minutes);
      const secondsValue = Number(seconds);
      const millisecondsValue = Number(milliseconds);

      console.log(
        "SetCustomTimer : hours, minutes, seconds, milliseconds",
        hoursValue,
        minutesValue,
        secondsValue,
        millisecondsValue
      );
      
      // Convert all values to milliseconds
      let hoursToMilliseconds = hoursValue * 60 * 60 * 1000;
      let minutesToMilliseconds = minutesValue * 60 * 1000;
      let secondsToMilliseconds = secondsValue * 1000;

      // Sum up total milliseconds
      let totalMilliseconds =
        hoursToMilliseconds +
        minutesToMilliseconds +
        secondsToMilliseconds +
        millisecondsValue;

      // Convert the given time to total milliseconds
      state.time = totalMilliseconds;
      console.log("By Setting Time", state.time);

      // Stop the timer initially
      state.running = false;
    },
  },
});

export const {
  startTimer,
  stopTimer,
  resetTimer,
  decrementTime,
  setCustomTime,
} = timerSlice.actions;
export default timerSlice.reducer;
