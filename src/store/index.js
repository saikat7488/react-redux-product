import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import stopwatchReducer from "../features/stopwatch/stopwatchSclice";
import timerReducer from "../features/timer/timerSlice";
import userActionReducer from "../features/userAction/userActionSlice";

import actionCounterMiddleware from "../middlewares/actionCounterMiddleware";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    stopwatch: stopwatchReducer,
    timer: timerReducer,
    userAction: userActionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionCounterMiddleware),
});

export default store;
