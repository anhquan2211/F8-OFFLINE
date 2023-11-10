import { useEffect, useRef } from "react";

import { useSelector } from "../../Provider/Provider";
import MAX_TURN, { RANGE_NUMBER } from "../../config/config";
import "./Form.css";

const Form = () => {
  const { data, state, dispatch } = useSelector();
  const { turn } = state;

  // Creating references to DOM elements
  const inputRef = useRef(null);
  const resetRef = useRef(null);

  // Determining the disabled state based on turn
  const isDisabled = turn === 0;

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const number = +inputRef.current.value;
    if (number) {
      if (!isDisabled && turn) {
        dispatch({
          type: "CHECK",
          payload: number,
        });
      }
      if (data.current.length >= 1) {
        data.current.push({ number });
      } else {
        data.current.push({
          number,
          maxTurn: MAX_TURN,
        });
      }
    }
  }

  // Function to handle input change and enforce input constraints
  function handleChange(e) {
    const regex = new RegExp(`^[0-9]{0,${(RANGE_NUMBER - 1 + "").length}}$`);
    if (!regex.test(e.target.value)) {
      inputRef.current.value = e.target.value.slice(0, -1);
    }
  }

  // Function to reset the game on button click
  function handleReplay() {
    dispatch({
      type: "RESET",
    });
  }

  // Effect handling keyboard events for number input and game reset
  useEffect(() => {
    function handleKeyDown(e) {
      let currentValue;
      if (!isDisabled) {
        switch (e.key) {
          case "ArrowDown":
            currentValue = +inputRef.current.value;
            inputRef.current.value =
              currentValue - 1 > 0 ? currentValue - 1 : 1;
            break;

          case "ArrowUp":
            inputRef.current.value =
              +inputRef.current.value + 1 < RANGE_NUMBER - 1
                ? +inputRef.current.value + 1
                : RANGE_NUMBER - 1;
            break;

          default:
            inputRef.current?.focus();
            break;
        }
      } else {
        resetRef.current?.focus();
        if (e.key === "Enter") {
          resetRef.current.click();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="form-container">
      {isDisabled ? (
        <button ref={resetRef} className="btn-replay" onClick={handleReplay}>
          Chơi lại
        </button>
      ) : (
        <form className="form-number" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Hãy thử nhập một số</label>
            <input
              type="text"
              name="number"
              className="input-number"
              placeholder="Hãy thử nhập một số..."
              onChange={handleChange}
              disabled={isDisabled}
              ref={inputRef}
              autoFocus
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn-submit" disabled={isDisabled}>
            Kiểm tra
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
