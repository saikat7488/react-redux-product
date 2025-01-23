import style from "./Stopwatch.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  start,
  stop,
  reset,
  tick,
} from "../../features/stopwatch/stopwatchSclice";

const Stopwatch = () => {
  const dispatch = useDispatch();
  const { time, running } = useSelector((state) => state.stopwatch);
  const userActionState = useSelector((state) => state.userAction);
  const isActionLimitReached = userActionState.isActionLimitReached;

  // Update the time every 10ms when running
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running, dispatch]);

  // Time Formated
  const timeFormated = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60));

    return {
      milliseconds,
      seconds,
      minutes,
      hours,
    };
  };

  // Ux-Design Pattern
  const renderDigits = (number, padNumber) => {
    const paddedNumber = String(number).padStart(padNumber, "0"); // Ensuring 4 digits
    return paddedNumber.split("").map((digit, index) => (
      <span key={index} className={style.digit}>
        {digit}
      </span>
    ));
  };

  const timeSeperator = () => {
    return (
      <div className={style.seperator}>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
      </div>
    );
  };

  return (
    <div className={style.stopwatchLayout}>
      {/* {renderDigits(hours, 3)}; */}

      <div className={style.stopWatachContainer}>
        <div className={style.stopwatch}>
          <div className={style.stopWatachContent}>
            {renderDigits(timeFormated(time).hours, 2)}
          </div>
          {timeSeperator()}
          <div className={style.stopWatachContent}>
            {renderDigits(timeFormated(time).minutes, 2)}
          </div>
          {timeSeperator()}
          <div className={style.stopWatachContent}>
            {renderDigits(timeFormated(time).seconds, 2)}
          </div>
          {timeSeperator()}
          <div className={style.stopWatachContent}>
            {renderDigits(timeFormated(time).milliseconds, 3)}
          </div>
        </div>
      </div>
      <div className={style.buttonGroup}>
        {!running ? (
          <button
            disabled={isActionLimitReached}
            onClick={() => dispatch(start())}
          >
            START
          </button>
        ) : (
          <button
            disabled={isActionLimitReached}
            onClick={() => dispatch(stop())}
          >
            STOP
          </button>
        )}
        <button
          disabled={isActionLimitReached}
          onClick={() => dispatch(reset())}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
