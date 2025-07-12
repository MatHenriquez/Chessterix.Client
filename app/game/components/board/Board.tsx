'use client';

import React from 'react';
import '../../styles/board.css';
import Pieces from '../pieces/Pieces';
import Popup from '../popups/Popup';
import PromotionBox from '../popups/PromotionBox';
import Files from './Files';
import Ranks from './Ranks';
import { useAppContext } from '@/core/contexts/Context';
import arbiter from '@/game/utils/arbiter';
import { getKingPosition } from '@/game/utils/getMoves';
import GameEnds from '../game-endings/GameEnds';


const Board = () => {
  const ROWS_AND_COLUMNS_NUMBER = 8;

  const { state } = useAppContext();
  const position = state.position[state.position.length - 1];

  const ranks = Array(ROWS_AND_COLUMNS_NUMBER)
    .fill(0)
    .map((_, index: number) => ROWS_AND_COLUMNS_NUMBER - index);

  const files = Array(ROWS_AND_COLUMNS_NUMBER)
    .fill(0)
    .map((_, index: number) => index + 1);

  const checkTile = (() => {
    let playerCode;
    if (state.turn === 'white') {
      playerCode = 'w';
    } else if (state.turn === 'black') {
      playerCode = 'b';
    } else {
      playerCode = state.turn;
    }

    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      position: position,
      player: playerCode
    });

    if (isInCheck) {
      const kingPosition = getKingPosition(position, playerCode);
      return kingPosition;
    }

    return null;
  })();

  const getClassName = (rank: number, file: number) => {
    let className = 'tile';
    className += (rank + file) % 2 === 0 ? ' tile--dark' : ' tile--light';

    if (checkTile && checkTile[0] === rank && checkTile[1] === file) {
      className += ' checked';
    }

    if (state.candidateMoves?.find((m) => m[0] === rank && m[1] === file)) {
      if (position[rank]?.[file]) {
        className += ' attacking';
      } else {
        className += ' highlight';
      }
    }

    return className;
  };

  return (
    <div className="board">
      <Ranks ranks={ranks} />
      <div className="tiles">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="rank">
            {Array.from({ length: 8 }, (_, j) => {
              const boardRank = 7 - i;
              const boardFile = j;

              return (
                <div
                  key={`${i}-${j}`}
                  className={getClassName(boardRank, boardFile)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <Pieces />
      <Popup>
        <PromotionBox onClosePopup={() => { }} />
        <GameEnds />
      </Popup>
      <Files files={files} />
    </div>
  );
};

export default Board;
