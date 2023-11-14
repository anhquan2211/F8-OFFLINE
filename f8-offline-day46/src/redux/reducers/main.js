import { combineReducers } from "redux";
import { cartReducer } from "./reducer";

const rootred = combineReducers({
  cartReducer,
});

export default rootred;
