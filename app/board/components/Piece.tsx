import arbiter from '@/utils/arbiter/arbiter';
import { useAppContext } from '@/contexts/Context';
import { generateCandidateMoves } from '@/reducer/actions/move';
import React, { FC, DragEvent } from 'react';
import '../styles/pieces.css';

type PieceProps = {
  piece: string;
  fileIndex: number;
  rank: number;
};

const Piece: FC<PieceProps> = ({ piece, fileIndex, rank }) => {
  const { state, dispatch } = useAppContext();
  const { turn, position } = state;

  const currentPosition = position[position.length - 1];
  const previousPosition = position[position.length - 2];

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${piece},${rank},${fileIndex}`);
    setTimeout(() => {
      (e.target as HTMLDivElement).style.display = 'none';
    }, 0);

    if (turn.startsWith(piece[0])) {
      const candidateMoves = arbiter.getRegularMoves(
        rank,
        fileIndex,
        currentPosition,
        piece,
        previousPosition
      );

      dispatch(generateCandidateMoves(candidateMoves));
    }
  };

  const onDragEnd = (e: DragEvent) => {
    (e.target as HTMLDivElement).style.display = 'block';
  };

  return (
    <div
      className={`piece ${piece} p-${fileIndex}${rank}`}
      draggable={true}
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={(e) => onDragEnd(e)}
    ></div>
  );
};

export default Piece;
