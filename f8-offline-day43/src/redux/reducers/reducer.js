/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */

import { postOrder } from "../../helpers/postOrder";

const INIT_STATE = {
  carts: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const itemIndex = state.carts?.findIndex((item) => {
        return item._id === action.payload._id;
      });

      if (itemIndex >= 0) {
        state.carts[itemIndex].amount += 1;
        state.carts[itemIndex].quantity -= 1;
      } else {
        action.payload.amount = 1;
        const temp = { ...action.payload, amount: 1 };
        const updatedCart = [...state.carts, temp];

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }

    case "DELETE_CART":
      // eslint-disable-next-line no-case-declarations
      const data = state.carts.filter(
        (element) => element._id !== action.payload
      );
      return {
        ...state,
        carts: data,
      };

    case "DECREASE_CART":
      const itemIndexDecrease = state.carts?.findIndex((item) => {
        return item._id === action.payload._id;
      });

      if (state.carts[itemIndexDecrease].amount >= 1) {
        const delItem = (state.carts[itemIndexDecrease].amount -= 1);

        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (+state.carts[itemIndexDecrease].amount === 1) {
        const data = state.carts.filter(
          (element) => element._id !== action.payload
        );
        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};
