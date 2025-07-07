import actionTypes from '../actionTypes';

export const updateCastling = (direction: { w: string; b: string }) => {
  return {
    type: actionTypes.CAN_CASTLE,
    payload: {
      castleDirection: direction
    }
  };
};
