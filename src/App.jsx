import style from "./App.module.css";

import Counter from "./components/counter/Counter";
import Timer from "./components/timer/Timer";
import Stopwatch from "./components/stopwatch/Stopwatch";

import { useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const App = () => {
  const userActionState = useSelector((state) => state.userAction);
  const actionLimit = userActionState.actionLimit;
  const actionCount = userActionState.actionCount;
  const isActionLimitReached = userActionState.isActionLimitReached;
  const percentage = (actionCount / actionLimit) * 100; // Calculate percentage

  return (
    <div className={style.appLayout}>
      <div className={style.containertLayout}>
        {isActionLimitReached && (
          <p className={style.warningMessage}>
            Action limit reached! You cannot perform further actions.
          </p>
        )}
        <div className={style.actionDesign}>
          <div style={{ width: "150px", margin: "0 auto" }}>
            <CircularProgressbar
              value={percentage}
              text={`${Math.min(percentage, 100).toFixed(0)}%`}
              styles={buildStyles({
                textColor: actionCount >= actionLimit ? "rgb(163, 13, 13)" : "white",
                pathColor: actionCount >= actionLimit ? "rgb(163, 13, 13)" : "rgb(238, 36, 36)",
                trailColor: "rgba(241, 243, 241, 0.83)",
              })}
            />
          </div>
        </div>
        <Stopwatch />
        <Counter />
        <Timer />
      </div>
    </div>
  );
};

export default App;
