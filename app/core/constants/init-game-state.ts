import { createInitialPosition } from '@/game/helpers/position';
import { turns } from './turns';

export const STATUS = {
  ONGOING: 'onGoing',
  PROMOTING: 'promoting',
  WHITE_WINS: 'whiteWins',
  BLACK_WINS: 'blackWins',
  STALEMATE: 'stalemate',
  INSUFFICIENT_MATERIAL: 'insufficient-material',
  BLACK: 'black',
  WHITE: 'white'
} as const;

export const initGameState = {
  position: [createInitialPosition()],
  turn: turns.WHITE,
  candidateMoves: [] as number[][],
  status: STATUS.ONGOING,
  promotionSquare: null,
  castleDirection: {
    w: 'both',
    b: 'both'
  },
  fiftyMoveCounter: 0,
  positionHistory: [] as string[],
};
