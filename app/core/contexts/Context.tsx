'use client';

export interface State {
  position: string[][][];
  turn: Turn;
  candidateMoves?: number[][];
  promotionSquare: {
    x: number;
    y: number;
    rank: number;
    file: number;
  } | null;
  status: 'onGoing' | 'promoting' | 'whiteWins' | 'blackWins' | 'stalemate' | 'insufficient-material' | 'threefold-repetition' | 'fifty-move-rule' | 'black' | 'white';
  movesList: string[];
  castleDirection: {
    w: string;
    b: string;
  };
  fiftyMoveCounter: number;
  positionHistory: string[];
  currentMoveIndex?: number;
}

export type Turn = 'white' | 'black';

import { STATUS } from '@/core/constants/init-game-state';
import { turns } from '@/core/constants/turns';
import React from 'react';
import actionTypes from '../reducer/actionTypes';

export interface MoveAction {
  position: string[][][];
  newMove: string;
  resetFiftyMoveCounter?: boolean;
}

export interface NewMoveAction {
  type: string;
  payload: MoveAction;
}

export interface ClearCandidateMovesAction {
  type: string;
  payload: CandidateMovesAction;
}

export interface CandidateMovesAction {
  candidateMoves: number[][];
}

export type UpdateCastlingAction = {
  type: typeof actionTypes.CAN_CASTLE;
  payload: {
    castleDirection: {
      w: string;
      b: string;
    };
  };
};

export interface PromotionPayload {
  rank: number;
  file: number;
  x: number;
  y: number;
}

export interface NewMoveAction {
  type: string;
  payload: MoveAction;
}

export interface GenerateCandidateMovesAction {
  type: string;
  payload: CandidateMovesAction;
}

export interface PromotionOpenAction {
  type: string;
  payload: PromotionPayload;
}

export interface CheckmateAction {
  type: string;
  payload: {
    winner: string;
  };
}

export interface PromotionCloseAction {
  type: string;
  payload: null;
}

export interface ThreefoldRepetitionAction {
  type: string;
  payload: null;
}

export interface FiftyMoveRuleAction {
  type: string;
  payload: null;
}

export interface TakeBackAction { 
  type: string,
  payload: undefined
}

export type Action =
  | NewMoveAction
  | GenerateCandidateMovesAction
  | ClearCandidateMovesAction
  | PromotionOpenAction
  | PromotionCloseAction
  | CheckmateAction
  | UpdateCastlingAction
  | ThreefoldRepetitionAction
  | FiftyMoveRuleAction
  | TakeBackAction

export interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = React.createContext<ContextType>({
  state: {
    position: [],
    turn: turns.WHITE,
    candidateMoves: [],
    promotionSquare: { x: 7, y: 7, rank: 7, file: 7 },
    status: STATUS.ONGOING as 'onGoing',
    movesList: [],
    castleDirection: { w: 'both', b: 'both' },
    fiftyMoveCounter: 0,
    positionHistory: []
  },
  dispatch: () => { }
});

export const useAppContext = () => {
  return React.useContext(AppContext);
};

export default AppContext;
