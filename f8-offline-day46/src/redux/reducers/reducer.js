/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */

const INIT_STATE = {
  carts: JSON.parse(localStorage.getItem("cart")) || [],
};

/**
 * Reducer function for managing the shopping cart state.
 *
 * @param {object} state - The current state of the shopping cart.
 * @param {object} action - The action object containing the type and payload.
 * @returns {object} - The new state of the shopping cart.
 */
export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const itemIndex = state.carts?.findIndex((item) => {
        return item._id === action.payload._id;
      });

      let updatedCart;
      if (itemIndex >= 0) {
        state.carts[itemIndex].amount += 1;
        state.carts[itemIndex].quantity -= 1;
        console.log(itemIndex);
        // Update the amount in localStorage
        const cartData = JSON.parse(localStorage.getItem("cart"));
        cartData[itemIndex].amount = +cartData[itemIndex].amount + 1;
        localStorage.setItem("cart", JSON.stringify(cartData));

        updatedCart = [...state.carts];
      } else {
        action.payload.amount = 1;
        const temp = { ...action.payload, amount: 1 };
        updatedCart = [...state.carts, temp];

        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return {
        ...state,
        carts: updatedCart,
      };

    case "DELETE_CART":
      // eslint-disable-next-line no-case-declarations
      const data = state.carts.filter(
        (element) => element._id !== action.payload
      );
      const cartData = JSON.parse(localStorage.getItem("cart"));
      const itemIndexDelete = cartData.findIndex((item) => {
        return item._id === action.payload;
      });
      cartData.splice(itemIndexDelete, 1); // Remove item from cartData array
      localStorage.setItem("cart", JSON.stringify(cartData));
      return {
        ...state,
        carts: data,
      };

    case "DECREASE_CART":
      const itemIndexDecrease = state.carts?.findIndex((item) => {
        return item._id === action.payload._id;
      });

      if (state.carts[itemIndexDecrease].amount >= 1) {
        const cartData = JSON.parse(localStorage.getItem("cart"));
        cartData[itemIndexDecrease].amount -= 1;
        localStorage.setItem("cart", JSON.stringify(cartData));

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

      break;

    case "DELETE_ALL":
      localStorage.removeItem("cart");
      return {
        ...state,
        carts: [],
      };

    default:
      return state;
  }
};
