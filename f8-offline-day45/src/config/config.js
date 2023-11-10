/*
 * REMEMBER: IT ALWAY DECREMENT BY ONE!
 */
export const RANGE_NUMBER = 100;

/**
 * This is count to play one game
 */
const MAX_TURN = Math.ceil(Math.log2(RANGE_NUMBER));
export default MAX_TURN;
