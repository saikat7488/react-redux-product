const actionCounterMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // List of action types to track
  const actionTypesToTrack = [
    "stopwatch/start",
    "stopwatch/stop",
    "stopwatch/reset",
    "counter/increment",
    "counter/decrement",
    "counter/increment_by_value",
    "counter/decrement_by_value",
    "counter/reset",
    "timer/startTimer",
    "timer/stopTimer",
    "timer/resetTimer",
  ];

  if (actionTypesToTrack.includes(action.type)) {
    store.dispatch({ type: "userAction/incrementActionCount" });
  }

  return result;
};

export default actionCounterMiddleware;
