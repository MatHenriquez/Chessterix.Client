import actionTypes from '../actionTypes';

export const makeNewMove = ({
  newPosition,
  newMove,
  resetFiftyMoveCounter = false
}: {
  newPosition: string[][][];
  newMove: string;
  resetFiftyMoveCounter: boolean;
}) => {
  return {
    type: actionTypes.NEW_MOVE,
    payload: {
      position: newPosition,
      newMove,
      resetFiftyMoveCounter
    }
  };
};

export const generateCandidateMoves = (candidateMoves: number[][]) => {
  return {
    type: actionTypes.GENERATE_CANDIDATE_MOVES,
    payload: {
      candidateMoves
    }
  };
};

export const clearCandidateMoves = () => {
  return {
    type: actionTypes.CLEAR_CANDIDATE_MOVES,
    payload: {
      candidateMoves: []
    }
  };
};
