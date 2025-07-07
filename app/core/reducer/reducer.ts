import {
  Action,
  CandidateMovesAction,
  MoveAction,
  PromotionPayload,
  State
} from '@/core/contexts/Context';
import actionTypes from './actionTypes';
import { turns } from '@/core/constants/turns';
import { STATUS } from '@/core/constants/init-game-state';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, position } = state;
      const { movesList } = state;
      turn = turn === turns.WHITE ? turns.BLACK : turns.WHITE;

      const rawPosition = (action.payload as MoveAction).position;
      let newPositions: string[][][] = [];
      if (rawPosition !== undefined) {
        newPositions = Array.isArray(rawPosition[0]?.[0])
          ? (rawPosition as unknown as string[][][])
          : [rawPosition as unknown as string[][]];
      }
      position = [...position, ...newPositions];

      const newMove = (action.payload as MoveAction).newMove;

      const currentMovesList = movesList || [];
      const updatedMovesList = newMove !== undefined ? [...currentMovesList, newMove] : currentMovesList;

      return {
        ...state,
        position,
        turn,
        candidateMoves: [],
        movesList: updatedMovesList
      };
    }

    case actionTypes.GENERATE_CANDIDATE_MOVES: {
      const { candidateMoves } = action.payload as CandidateMovesAction;
      return {
        ...state,
        candidateMoves
      };
    }

    case actionTypes.CLEAR_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: []
      };
    }

    case actionTypes.PROMOTION_OPEN: {
      return {
        ...state,
        status: STATUS.PROMOTING as 'promoting',
        promotionSquare: action.payload as PromotionPayload
      };
    }

    case actionTypes.PROMOTION_CLOSE: {
      return {
        ...state,
        status: STATUS.ONGOING as 'onGoing',
        promotionSquare: null
      };
    }

    default:
      return state;
  }
}

export { reducer };
