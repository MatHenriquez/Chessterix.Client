import { createInitialPosition } from '@/game/helpers/position';
import { turns } from './turns';

export const STATUS = {
  ONGOING: 'onGoing',
  PROMOTING: 'promoting',
  WHITE_WINS: 'whiteWins',
  BLACK_WINS: 'blackWins'
};

export const initGameState = {
  position: [createInitialPosition()],
  turn: turns.WHITE,
  candidateMoves: [] as number[][],
  status: STATUS.ONGOING,
  promotionSquare: null,
  castleDirection: {
    w: 'both',
    b: 'both'
  }
};
