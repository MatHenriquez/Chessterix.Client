'use client';
import React, { useReducer, useMemo } from 'react';
import AppContext, { State } from './Context';
import { reducer } from '../reducer/reducer';
import { initGameState } from '@/constants/init-game-state';

export default function Providers({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const initialState: State = {
    position: initGameState.position,
    turn: initGameState.turn,
    promotionSquare: null,
    status: 'onGoing',
    movesList: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const providerState = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={providerState}>{children}</AppContext.Provider>
  );
}
