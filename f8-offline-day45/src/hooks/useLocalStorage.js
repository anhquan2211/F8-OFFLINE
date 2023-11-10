export const useLocalStorage = () => {
  /**
   * Sets the value in the localStorage under a specific key.
   * @function
   * @param {string} key - The identifier for the localStorage entry.
   * @param {any} value - The value to be stored.
   * @returns {any} The stored value.
   */
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  };

  /**
   * Retrieves the value from the localStorage for a given key.
   * @function
   * @param {string} key - The identifier for the localStorage entry.
   * @returns {any | null} The retrieved value, or null if the key doesn't exist.
   */
  const getLocalStorage = (key) => {
    const dataLocalStorage = localStorage.getItem(key);
    return dataLocalStorage ? JSON.parse(dataLocalStorage) : null;
  };

  /**
   * Removes the value associated with the key from localStorage.
   * @function
   * @param {string} key - The identifier for the localStorage entry to be removed.
   * @returns {any | null} The removed value, or null if the key doesn't exist.
   */
  const clearLocalStorage = (key) => {
    const dataLocalStorage = getLocalStorage(key);
    localStorage.removeItem(key);
    return dataLocalStorage;
  };

  /**
   * Manages localStorage operations.
   */
  return { setLocalStorage, getLocalStorage, clearLocalStorage };
};
