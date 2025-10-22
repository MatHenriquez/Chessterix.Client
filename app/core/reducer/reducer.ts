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

const positionToString = (position: string[][]): string => {
  return position.map(row => row.join(',')).join(';');
};

const shouldResetFiftyMoveCounter = (
  oldPosition: string[][],
  newPosition: string[][],
  piece: string
): boolean => {
  if (piece.endsWith('p')) return true;
  
  const oldPieces = oldPosition.flat().filter(p => p !== '').length;
  const newPieces = newPosition.flat().filter(p => p !== '').length;
  
  return oldPieces !== newPieces;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, position, fiftyMoveCounter, positionHistory } = state;
      const { movesList } = state;
      turn = turn === turns.WHITE ? turns.BLACK : turns.WHITE;

      const rawPosition = (action.payload as MoveAction).position;
      let newPositions: string[][][] = [];
      if (rawPosition !== undefined) {
        newPositions = Array.isArray(rawPosition[0]?.[0])
          ? (rawPosition as unknown as string[][][])
          : [rawPosition as unknown as string[][]];
      }
      
      const oldPosition = position[position.length - 1];
      const newPosition = newPositions[0];
      position = [...position, ...newPositions];

      const newMove = (action.payload as MoveAction).newMove;
      const resetFiftyMove = (action.payload as MoveAction).resetFiftyMoveCounter;

      if (resetFiftyMove || shouldResetFiftyMoveCounter(oldPosition, newPosition, newMove.charAt(0))) {
        fiftyMoveCounter = 0;
      } else {
        fiftyMoveCounter += 1;
      }

      const positionString = positionToString(newPosition);
      positionHistory = [...positionHistory, positionString];

      const currentMovesList = movesList || [];
      const updatedMovesList =
        newMove !== undefined
          ? [...currentMovesList, newMove]
          : currentMovesList;

      return {
        ...state,
        position,
        turn,
        candidateMoves: [],
        movesList: updatedMovesList,
        fiftyMoveCounter,
        positionHistory,
        currentMoveIndex: position.length - 1
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
        status: STATUS.PROMOTING,
        promotionSquare: action.payload as PromotionPayload
      };
    }

    case actionTypes.PROMOTION_CLOSE: {
      return {
        ...state,
        status: STATUS.ONGOING,
        promotionSquare: null
      };
    }

    case actionTypes.CAN_CASTLE: {
      return {
        ...state,
        castleDirection: (
          action.payload as { castleDirection: { w: string; b: string } }
        ).castleDirection
      };
    }

    case actionTypes.STALEMATE: {
      return {
        ...state,
        status: STATUS.STALEMATE as 'stalemate'
      };
    }

    case actionTypes.INSUFFICIENT_MATERIAL: {
      return {
        ...state,
        status: STATUS.INSUFFICIENT_MATERIAL as 'insufficient-material'
      };
    }

    case actionTypes.THREEFOLD_REPETITION: {
      return {
        ...state,
        status: 'threefold-repetition' as const
      };
    }

    case actionTypes.FIFTY_MOVE_RULE: {
      return {
        ...state,
        status: 'fifty-move-rule' as const
      };
    }

    case actionTypes.WIN: {
      const winner = (action.payload as { winner: string }).winner;
      const newStatus = winner === 'w' ? STATUS.WHITE_WINS : STATUS.BLACK_WINS;
      return {
        ...state,
        status: newStatus,
        candidateMoves: []
      };
    }

    case actionTypes.NEW_GAME: {
      return {
        ...state,
        ...action.payload,
        fiftyMoveCounter: 0,
        positionHistory: []
      };
    }

    case actionTypes.TAKE_BACK: {
      const { position, currentMoveIndex = position.length - 1 } = state;
      
      if (currentMoveIndex > 0) {
        const newIndex = currentMoveIndex - 1;
        
        return {
          ...state,
          currentMoveIndex: newIndex
        };
      }

      return state;
    }

    case actionTypes.GO_FORWARD: {
      const { position, currentMoveIndex = position.length - 1 } = state;
      
      if (currentMoveIndex < position.length - 1) {
        const newIndex = currentMoveIndex + 1;
        
        return {
          ...state,
          currentMoveIndex: newIndex
        };
      }

      return state;
    }

    default:
      return state;
  }
}

export { reducer };