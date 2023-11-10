import PropTypes from "prop-types";
import { TableCaption } from "@chakra-ui/react";

import MAX_TURN from "../../config/config";

/**
 * @function RateResult
 * @param {number} [turnUser=MAX_TURN] - The number of turns the user has made.
 * @param {number} [maxTurn=MAX_TURN] - The maximum number of turns allowed.
 * @param {boolean} [correct=false] - Boolean denoting correctness of the guess.
 * @returns {JSX.Element} - A JSX element displaying the success rate.
 */
const RateResult = ({
  turnUser = MAX_TURN,
  maxTurn = MAX_TURN,
  correct = false,
}) => {
  /**
   * Calculates the success rate based on the number of turns and correctness.
   * @returns {string} - A string representation of the success rate.
   */
  const getRateResult = () => {
    let rateResult = (((maxTurn - turnUser + 1) / maxTurn) * 100).toFixed(2);
    if (turnUser === maxTurn && !correct) {
      rateResult = 0;
    }
    return rateResult + "%";
  };
  return (
    <TableCaption fontSize={20} marginTop={0}>
      Tỷ lệ đúng: {getRateResult()}
    </TableCaption>
  );
};

export default RateResult;

RateResult.propTypes = {
  turnUser: PropTypes.number,
  maxTurn: PropTypes.number,
  correct: PropTypes.bool,
};
