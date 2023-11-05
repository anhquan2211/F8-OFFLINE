/**
 * Action to add an item to the shopping cart.
 *
 * @param {object} item - The item to be added to the cart.
 * @returns {object} - Action object with type and payload.
 */
export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

/**
 * Action to increase the quantity of an item in the cart.
 *
 * @param {object} item - The item for which the quantity should be increased.
 * @returns {object} - Action object with type and payload.
 */
export const DECREASE = (item) => {
  return {
    type: "DECREASE_CART",
    payload: item,
  };
};

/**
 * Action to remove an item from the cart.
 *
 * @param {string} id - The ID of the item to be removed.
 * @returns {object} - Action object with type and payload.
 */
export const DELETE = (id) => {
  return {
    type: "DELETE_CART",
    payload: id,
  };
};

/**
 * Action to remove all items from the cart.
 *
 * @returns {object} - Action object with type.
 */
export const DELETE_ALL = () => {
  return {
    type: "DELETE_ALL",
  };
};
