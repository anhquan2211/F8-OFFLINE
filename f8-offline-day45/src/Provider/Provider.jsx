/**
 * @file Provider.jsx
 * @description Context provider for managing application state.
 */

import { createContext, useContext, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import reducer, { initialState } from "../store/store";

// Create a context for managing and sharing state
const Context = createContext();

// Custom hook for using the context value
// eslint-disable-next-line react-refresh/only-export-components
export const useSelector = () => useContext(Context);

// Provider component that manages the state and exposes it to child components
function Provider({ children }) {
  // Using useReducer to manage state updates with the defined reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Using useRef to keep track of a mutable data object
  const data = useRef([]);

  return (
    // Provide the state, dispatcher, and data to components consuming this context
    <Context.Provider value={{ state, data, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;

// Define the prop types for the Provider component
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
