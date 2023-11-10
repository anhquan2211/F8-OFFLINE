import { RANGE_NUMBER } from "../config/config";

/**
 * Brief description of the function's purpose.
 * @function
 * @returns {number} Description of what the function returns.
 */
export default function getNumber() {
  return Math.floor(Math.random() * RANGE_NUMBER - 1) + 1;
}
