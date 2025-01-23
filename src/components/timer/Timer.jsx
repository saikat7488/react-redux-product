import style from "./timer.module.css";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  decrementTime,
  setCustomTime,
} from "../../features/timer/timerSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const { time, running } = useSelector((state) => state.timer);
  const [isFormActive, setIsFormActive] = useState(false);
  const formRef = useRef(null);

  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputseconds] = useState(0);
  const [inputMilliseconds, setInputMilliseconds] = useState(0);

  const userActionState = useSelector((state) => state.userAction);
  const isActionLimitReached = userActionState.isActionLimitReached;

  const handleOutsideSubmit = () => {
    formRef.current.requestSubmit(); // Programmatically trigger form submission
  };

  // Update the time every 10ms when running
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 10);
    }
    return () => clearInterval(interval); // Cleanup interval on stop
  }, [running, dispatch]);

  // Time formatted function
  const timeFormated = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60));
    return { hours, minutes, seconds, milliseconds };
  };

  const { hours, minutes, seconds, milliseconds } = timeFormated(time);

  // UX design pattern to render digits
  const renderDigits = (number, padNumber) => {
    const paddedNumber = String(number).padStart(padNumber, "0");
    return paddedNumber.split("").map((digit, index) => (
      <span key={index} className={style.digit}>
        {digit}
      </span>
    ));
  };

  // Time separator
  const timeSeperator = () => {
    return (
      <div className={style.seperator}>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
      </div>
    );
  };

  const setButtonAction = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log("Clear Timer");
    dispatch(
      setCustomTime({
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      })
    );

    setInputHours(0);
    setInputMinutes(0);
    setInputseconds(0);
    setInputMilliseconds(0);

    setIsFormActive(true); // Activate the input form
  };

  const calculateTimeInMilisecons = (
    inputHours,
    inputMinutes,
    inputSeconds,
    inputMiliseconds
  ) => {
    dispatch(
      setCustomTime({
        hours: inputHours || 0,
        minutes: inputMinutes || 0,
        seconds: inputSeconds || 0,
        milliseconds: inputMiliseconds || 0,
      })
    );
    setIsFormActive(false);
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    //Clear Timer
    calculateTimeInMilisecons(
      inputHours,
      inputMinutes,
      inputSeconds,
      inputMilliseconds
    );
  };

  const handleInputChange = (field, value, onChangeEvent) => {
    // Remove non-numeric and negative signs
    value = value.replace(/[^0-9]/g, "");

    // Keep only the last 2 digits
    if (value.length > 2) {
      if (field === "milliseconds") {
        value = value.slice(-3);
      } else {
        value = value.slice(-2);
      }
    }

    // Update the state with the sanitized value
    onChangeEvent(field, Number(value));
  };

  const onChangeEvent = (type, value) => {
    console.log("type, value", type, value);
    switch (type) {
      case "hours":
        setInputHours(value); // Set the hours value
        break; // Prevent fall-through

      case "minutes":
        setInputMinutes(value); // Set the minutes value
        break; // Prevent fall-through

      case "seconds":
        setInputseconds(value); // Set the seconds value
        break; // Prevent fall-through

      case "milliseconds":
        setInputMilliseconds(value); // Set the milliseconds value
        break;

      default:
        break;
    }
  };

  return (
    <div className={style.timerLayout}>
      <div className={style.timerContainer}>
        <form ref={formRef} className={style.timer} onSubmit={onSubmitEvent}>
          <div className={style.timerContent}>
            {isFormActive ? (
              <input
                type="number"
                name="hours"
                id="hours"
                className={style.inputField}
                min={0}
                max={99}
                step={1}
                value={inputHours}
                onChange={(e) =>
                  handleInputChange("hours", e.target.value, onChangeEvent)
                }
              />
            ) : (
              renderDigits(hours, 2)
            )}
          </div>
          {timeSeperator()}
          <div className={style.timerContent}>
            {isFormActive ? (
              <input
                type="number"
                name="minutes"
                id="minutes"
                className={style.inputField}
                min={0}
                max={59}
                step={1}
                value={inputMinutes}
                onChange={(e) =>
                  handleInputChange("minutes", e.target.value, onChangeEvent)
                }
              />
            ) : (
              renderDigits(minutes, 2)
            )}
          </div>
          {timeSeperator()}
          <div className={style.timerContent}>
            {isFormActive ? (
              <input
                type="number"
                name="seconds"
                id="seconds"
                className={style.inputField}
                min={0}
                max={59}
                value={inputSeconds}
                onChange={(e) =>
                  handleInputChange("seconds", e.target.value, onChangeEvent)
                }
              />
            ) : (
              renderDigits(seconds, 2)
            )}
          </div>
          {timeSeperator()}
          <div className={style.timerContent}>
            {isFormActive ? (
              <input
                type="number"
                name="milliseconds"
                id="milliseconds"
                className={style.inputField}
                min={0}
                max={999}
                value={inputMilliseconds}
                onChange={(e) =>
                  handleInputChange(
                    "milliseconds",
                    e.target.value,
                    onChangeEvent
                  )
                }
              />
            ) : (
              renderDigits(milliseconds, 3)
            )}
          </div>
          {isFormActive ? (
            <button
              type="submit"
              className={`${style.inputSubmitBtn} ${style.submitBtn}`}
            >
              SUBMIT
            </button>
          ) : (
            <button
              className={`${style.inputSubmitBtn} ${style.setBtn}`}
              onClick={setButtonAction}
            >
              SET
            </button>
          )}
        </form>
      </div>

      {/* Button controls */}
      <div className={style.buttonGroup}>
        {!running ? (
          <button
            disabled={isActionLimitReached}
            onClick={() => {
              if (isFormActive) {
                setIsFormActive(false);
                handleOutsideSubmit();
                dispatch(startTimer());
              } else {
                dispatch(startTimer());
              }
            }}
          >
            Start
          </button>
        ) : (
          <button
            disabled={isActionLimitReached}
            onClick={() => dispatch(stopTimer())}
          >
            Stop
          </button>
        )}
        <button
          disabled={isActionLimitReached}
          onClick={() => {
            if (isFormActive) {
              setIsFormActive(false);
              dispatch(resetTimer());
            } else {
              dispatch(resetTimer());
            }
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
