'use client';
import '../styles/pieces.css';
import React, { FC, useRef } from 'react';
import Piece from './Piece';
import { useAppContext } from '@/contexts/Context';
import { clearCandidateMoves, makeNewMove } from '@/reducer/actions/move';
import arbiter from '@/utils/arbiter/arbiter';
import { openPromotion } from '@/reducer/actions/popup';
import { updateCastling } from '@/reducer/actions/game';
import { getCastlingDirections } from '@/utils/arbiter/getMoves';
import { getNewMoveNotation } from '../helpers/position';

const Pieces: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { state, dispatch } = useAppContext();

  const currentPosition = state.position[state.position.length - 1];

  const openPromotionBox = ({
    rank,
    file,
    x,
    y
  }: {
    rank: number;
    file: number;
    x: number;
    y: number;
  }) => {
    dispatch(
      openPromotion({
        rank: Number(rank),
        file: Number(file),
        x: Number(x),
        y: Number(y)
      })
    );
  };

  const calculateCoordinates = (
    e: React.MouseEvent<HTMLDivElement>
  ): [number, number] => {
    const { width, left, top } = ref.current?.getBoundingClientRect() || {
      width: 0,
      left: 0,
      top: 0
    };

    const size = width / 8;
    const y = 7 - Math.floor((e.clientY - top) / size);
    const x = Math.floor((e.clientX - left) / size);

    return [y, x];
  };

const updateCastlingState = ({
  piece,
  file,
  rank,
}: { piece: string; file: number; rank: number }) => {
  const currentCastleDirection = state.castleDirection;
  
  const direction = getCastlingDirections({
    castleDirection: currentCastleDirection,
    piece,
    file,
    rank
  });

  const kingColor = piece.startsWith('w') ? 'w' : 'b';
  const newCastleDirection = {
    ...currentCastleDirection,
    [kingColor]: direction
  };

  if (direction) {
    dispatch(updateCastling(newCastleDirection));
  }
}

  const move = (e: React.DragEvent<HTMLDivElement>) => {
    const [x, y] = calculateCoordinates(e)
    const [piece, rank, file] = e.dataTransfer.getData("text").split(',')

    if (state.candidateMoves?.find(m => m[0] === x && m[1] === y)) {

      if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
        openPromotionBox({ rank: Number(rank), file: Number(file), x, y })
        return
      }
      if (piece.endsWith('r') || piece.endsWith('k')) {
        updateCastlingState({ piece, file: Number(file), rank: Number(rank) })
      }
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank: Number(rank),
        file: Number(file),
        x,
        y
      })
      const newMove = getNewMoveNotation({
        piece,
        rank: Number(rank),
        file: Number(file),
        x,
        y,
        position: currentPosition,
      })
      dispatch(makeNewMove({ newPosition: [newPosition], newMove }))
    }
    dispatch(clearCandidateMoves())
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    move(e);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderRow = (row: string[], rank: number) => {
    return row.map((piece, fileIndex) =>
      piece ? (
        <Piece
          key={`${rank}-${fileIndex}`}
          rank={rank}
          fileIndex={fileIndex}
          piece={piece}
        />
      ) : null
    );
  };

  return (
    <div className="pieces" ref={ref} onDrop={onDrop} onDragOver={onDragOver}>
      {currentPosition.map((row, rank) => renderRow(row, rank))}
    </div>
  );
};

export default Pieces;
