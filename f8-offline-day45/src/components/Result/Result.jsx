import { useEffect } from "react";

import { useSelector } from "../../Provider/Provider";
import MAX_TURN, { RANGE_NUMBER } from "../../config/config";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { handleResult } from "../../store/store";
import notify from "../../helpers/notify";
import "./Result.css";

const Result = () => {
  const { state, data } = useSelector();

  const { setLocalStorage, getLocalStorage } = useLocalStorage();

  // Destructuring turn and result from state
  const { turn, result } = state;

  // Calculating the progress width
  const progressWidth = (turn / MAX_TURN) * 100 + "%";

  // Effect for storing data when game ends or turn becomes 0
  useEffect(() => {
    if (result === "CORRECT" || turn === 0) {
      const dataStorage = getLocalStorage("data") || [];

      const dataArray = JSON.parse(JSON.stringify(data.current));

      if (result === "CORRECT") {
        dataArray[dataArray.length - 1].correct = true;
      }
      if (dataStorage) {
        dataStorage.unshift(dataArray);
      }
      setLocalStorage("data", dataStorage);
      data.current = [];
    }
  }, [data, state]);

  // Effect for displaying notifications based on state changes
  useEffect(() => {
    notify(result, turn);
  }, [state]);

  return (
    <div className="container">
      <div className="progress" style={{ width: `${progressWidth}` }}></div>
      <div className="heading">{handleResult(result, turn)}</div>
      <div className="turn">
        Còn {turn} / {MAX_TURN} lần đoán
      </div>
      <div className="description">
        Bạn cần tìm kiếm một số từ 1 đến {RANGE_NUMBER - 1}
      </div>
    </div>
  );
};

export default Result;
