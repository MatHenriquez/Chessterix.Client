import React, { FC, DragEvent } from 'react';
import '../../styles/pieces.css';
import { useAppContext } from '@/core/contexts/Context';
import { generateCandidateMoves } from '@/core/reducer/actions/move';
import arbiter from '@/game/utils/arbiter';

type PieceProps = {
  piece: string;
  fileIndex: number;
  rank: number;
};

const Piece: FC<PieceProps> = ({ piece, fileIndex, rank }) => {
  const { state, dispatch } = useAppContext();
  const { turn, position, castleDirection } = state;

  const currentPosition = position[position.length - 1];

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${piece},${rank},${fileIndex}`);
    setTimeout(() => {
      (e.target as HTMLDivElement).style.display = 'none';
    }, 0);

    if (turn.startsWith(piece[0])) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition,
        prevPosition: position[position.length - 2],
        castleDirection: castleDirection[turn[0] as 'w' | 'b'],
        piece,
        file: fileIndex,
        rank
      });

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
