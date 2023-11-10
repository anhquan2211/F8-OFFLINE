import { handleResult } from "../store/store";
import { toast } from "react-toastify";

/**
 * Handles displaying toast notifications based on the game result and time.
 * @function
 * @param {string} result - The current game result.
 * @param {number} turn - The remaining game turns.
 * @param {string} [message] - Optional message to display in the notification.
 */
export default function notify(result, turn, message) {
  let type = "info";
  switch (result) {
    case "UP":
      type = "warn";
      break;

    case "DOWN":
      type = "warn";
      break;

    case "CORRECT":
      type = "success";
      break;

    case "ERROR":
      type = "error";
      break;

    default:
      type = "info";
      break;
  }
  if (turn === 0 && result !== "CORRECT") {
    type = "error";
  }
  toast[type](message || handleResult(result, turn));
}
