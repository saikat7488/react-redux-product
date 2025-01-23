import style from "./Counter.module.css";
import {
  increment,
  decrement,
  increment_by_value,
  decrement_by_value,
  reset,
} from "../../features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const Counter = () => {
  const counterState = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  //userAction
  const userActionState = useSelector((state) => state.userAction);
  const isActionLimitReached = userActionState.isActionLimitReached;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleIncrementByValue = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      dispatch(increment_by_value(value));
    }
  };

  const handleDecrementByValue = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      dispatch(decrement_by_value(value));
    }
  };

  return (
    <div className={style.counterLayout}>
      <div className={style.containerLayout}>
        <p>Counter: {counterState.count}</p>
        <div className={style.buttonGroup}>
          <button
            type="button"
            disabled={isActionLimitReached}
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            type="button"
            disabled={isActionLimitReached}
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>

        <input
          className={style.inputField}
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Insert the number..."
        />

        <div className={style.buttonGroup}>
          <button
            type="button"
            disabled={isActionLimitReached}
            onClick={handleIncrementByValue}
          >
            Increment By Value
          </button>
          <button
            type="button"
            disabled={isActionLimitReached}
            onClick={handleDecrementByValue}
          >
            Decrement By Value
          </button>
        </div>

        <div className={style.buttonGroup}>
          <button
            type="button"
            disabled={isActionLimitReached}
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
