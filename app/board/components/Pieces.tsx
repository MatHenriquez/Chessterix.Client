'use client';
import '../styles/pieces.css';
import React, { FC, useRef } from 'react';
import Piece from './Piece';
import { useAppContext } from '@/contexts/Context';
import { clearCandidateMoves, makeNewMove } from '@/reducer/actions/move';
import arbiter from '@/utils/arbiter/arbiter';
import { openPromotion } from '@/reducer/actions/popup';

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

const move = (e: React.DragEvent<HTMLDivElement>) => {
  const [rankIndex, fileIndex] = calculateCoordinates(e);

  const [piece, rankStr, fileStr] = e.dataTransfer.getData('text').split(',');
  const rank = Number(rankStr);
  const file = Number(fileStr);

  const isValidMove = state.candidateMoves?.find(
    (m) => m[0] === rankIndex && m[1] === fileIndex
  );

  if (isValidMove) {
    const isPawnPromotion = (piece === 'wp' && rankIndex === 7) || 
                           (piece === 'bp' && rankIndex === 0);
    
    if (isPawnPromotion) {
      openPromotionBox({ 
        rank, 
        file, 
        x: rankIndex,
        y: fileIndex
      });
      dispatch(clearCandidateMoves());
      return;
    }

    const newPosition = arbiter.performMove({
      position: currentPosition,
      piece,
      rank,
      file,
      x: rankIndex,
      y: fileIndex
    });
    
    const newMove = `${piece}${String.fromCharCode(97 + file)}${
      rank + 1
    }-${String.fromCharCode(97 + fileIndex)}${rankIndex + 1}`;
    
    dispatch(makeNewMove({ newPosition: [newPosition], newMove }));
  }

  dispatch(clearCandidateMoves());
};

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
