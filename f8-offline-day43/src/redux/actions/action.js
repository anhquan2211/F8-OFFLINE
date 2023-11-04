export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

// Increase item
export const DECREASE = (item) => {
  return {
    type: "DECREASE_CART",
    payload: item,
  };
};

// Remove item
export const DELETE = (id) => {
  return {
    type: "DELETE_CART",
    payload: id,
  };
};
