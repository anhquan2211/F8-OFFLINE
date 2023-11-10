import CHECK_TIME from "../config/config";
import getNumber from "../helpers/getNumber";

// Initial state of the game
export const initialState = {
  turn: CHECK_TIME, // Number of turns for the game
  number: getNumber(), // Random number generated for the game
  result: "DEFAULT", // Default game result
};

// Function to generate result message based on user input and turns remaining
export function handleResult(result, turn) {
  const message =
    turn > 0 ? "Hmm... Bạn cần " : "Bạn đã hết lượt chơi, đáng lẽ bạn nên ";
  switch (result) {
    case "UP":
      return message + "tăng một chút.";

    case "DOWN":
      return message + "giảm một chút";

    case "CORRECT":
      return "Chúc mừng bạn, bạn đã trả lời đúng.";

    default:
      return "Chào mừng bạn đến với trò chơi đoán số";
  }
}

// Reducer function to handle state changes based on dispatched actions
const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK": {
      let result = "UP";
      let turn = state.turn - 1 > 0 ? state.turn - 1 : 0;
      const number = action.payload;
      if (number === state.number) {
        result = "CORRECT";
        turn = 0;
      }
      if (number > state.number) {
        result = "DOWN";
      }

      return {
        ...state,
        result,
        turn,
      };
    }
    case "RESET":
      return {
        ...initialState, // Reset to initial state
        number: getNumber(), // Generate a new random number
      };

    default:
      return state;
  }
};

export default reducer;
