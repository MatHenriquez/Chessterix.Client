import { initGameState } from '@/core/constants/init-game-state';
import actionTypes from '../actionTypes';

export const updateCastling = (direction: { w: string; b: string }) => {
  return {
    type: actionTypes.CAN_CASTLE,
    payload: {
      castleDirection: direction
    }
  };
};

export const detectStalemate = () => {
  return {
    type: actionTypes.STALEMATE,
    payload: null
  };
};

export const detectInsufficientMaterial = () => {
  return {
    type: actionTypes.INSUFFICIENT_MATERIAL,
    payload: null
  };
};

export const detectThreefoldRepetition = () => {
  return {
    type: actionTypes.THREEFOLD_REPETITION,
    payload: null
  };
};

export const detectFiftyMoveRule = () => {
  return {
    type: actionTypes.FIFTY_MOVE_RULE,
    payload: null
  };
};

export const detectCheckmate = (winner: string) => {
  return {
    type: actionTypes.WIN,
    payload: { winner }
  };
};

export const setupNewGame = () => {
  return {
    type: actionTypes.NEW_GAME,
    payload: initGameState
  };
};
