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
  status: 'onGoing' | 'promoting' | 'whiteWins' | 'blackWins';
  movesList: string[];
  castleDirection: {
    w: string;
    b: string;
  };
}

export type Turn = 'white' | 'black';

import { STATUS } from '@/constants/init-game-state';
import { turns } from '@/constants/turns';
import actionTypes from '@/reducer/actionTypes';
import React from 'react';

export interface MoveAction {
  position: string[][][];
  newMove: string;
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
  type: typeof actionTypes.UPDATE_CASTLING;
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

export interface PromotionCloseAction {
  type: string;
  payload: null;
}

export type Action =
  | NewMoveAction
  | GenerateCandidateMovesAction
  | ClearCandidateMovesAction
  | PromotionOpenAction
  | PromotionCloseAction
  | UpdateCastlingAction

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
    castleDirection: { w: 'both', b: 'both' }
  },
  dispatch: () => { }
});

export const useAppContext = () => {
  return React.useContext(AppContext);
};

export default AppContext;
