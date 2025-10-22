'use client';
import '../../styles/pieces.css';
import React, { FC, useRef } from 'react';
import Piece from './Piece';
import { useAppContext } from '@/core/contexts/Context';
import { openPromotion } from '@/core/reducer/actions/popup';
import { clearCandidateMoves, makeNewMove } from '@/core/reducer/actions/move';
import arbiter from '@/game/utils/arbiter';
import { detectCheckmate, detectFiftyMoveRule, detectInsufficientMaterial, detectStalemate, detectThreefoldRepetition, updateCastling } from '@/core/reducer/actions/game';
import { getNewMoveNotation } from '@/game/helpers/position';

const Pieces: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useAppContext();
  const currentIndex = state.currentMoveIndex ?? state.position.length - 1;
  const currentPosition = state.position[currentIndex];
  const isViewingHistory = currentIndex < state.position.length - 1;

  const updateCastlingState = ({
    piece,
    file,
    rank,
  }: { piece: string; file: number; rank: number }) => {
    const currentCastleDirection = state.castleDirection;
    const kingColor = piece.startsWith('w') ? 'w' : 'b';
    let newDirection = currentCastleDirection[kingColor];

    if (piece.endsWith('k')) {
      newDirection = 'none';
    }
    else if (piece === 'wr' && file === 0 && rank === 0) {
      newDirection = newDirection === 'both' ? 'right' : 'none';
    }
    else if (piece === 'wr' && file === 7 && rank === 0) {
      newDirection = newDirection === 'both' ? 'left' : 'none';
    }
    else if (piece === 'br' && file === 0 && rank === 7) {
      newDirection = newDirection === 'both' ? 'right' : 'none';
    }
    else if (piece === 'br' && file === 7 && rank === 7) {
      newDirection = newDirection === 'both' ? 'left' : 'none';
    }

    if (newDirection !== currentCastleDirection[kingColor]) {
      const newCastleDirection = {
        ...currentCastleDirection,
        [kingColor]: newDirection
      };

      dispatch(updateCastling(newCastleDirection));
    }
  }

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
    if (isViewingHistory) {
      dispatch(clearCandidateMoves());
      return;
    }

    const [rankIndex, fileIndex] = calculateCoordinates(e);
    const [piece, rankStr, fileStr] = e.dataTransfer.getData('text').split(',');
    const rank = Number(rankStr);
    const file = Number(fileStr);

    const isValidMove = state.candidateMoves?.find(
      (m) => m[0] === rankIndex && m[1] === fileIndex
    );

    if (isValidMove) {
      if (piece.endsWith('p') && (rankIndex === 0 || rankIndex === 7)) {
        openPromotionBox({
          rank,
          file,
          x: rankIndex,
          y: fileIndex
        });
        return;
      }

      updateCastlingState({ piece, file, rank });

      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece, rank, file,
        x: rankIndex, y: fileIndex
      });

      const newMove = getNewMoveNotation({
        piece,
        rank,
        file,
        x: rankIndex,
        y: fileIndex,
        position: currentPosition,
      });

      const resetFiftyMove = piece.endsWith('p') ||
        (currentPosition[rankIndex][fileIndex] !== '');


      const newFiftyMoveCounter = resetFiftyMove ? 0 : state.fiftyMoveCounter + 1;

      dispatch(makeNewMove({
        newPosition: [newPosition],
        newMove,
        resetFiftyMoveCounter: resetFiftyMove
      }));

      const currentColor = piece.startsWith('w') ? 'w' : 'b';
      const opponent = currentColor === 'w' ? 'b' : 'w';
      const castleDirection = state.castleDirection;

      if (newFiftyMoveCounter >= 100) {
        dispatch(detectFiftyMoveRule());
      }
      else if (arbiter.isThreefoldRepetition([...state.positionHistory, arbiter.positionToString(newPosition)])) {
        dispatch(detectThreefoldRepetition());
      }
      else if (arbiter.insufficientMaterial(newPosition)) {
        dispatch(detectInsufficientMaterial());
      }
      else if (arbiter.isStalemate(newPosition, opponent, castleDirection[opponent])) {
        dispatch(detectStalemate());
      }
      else if (arbiter.isCheckMate(newPosition, opponent, castleDirection[opponent])) {
        dispatch(detectCheckmate(currentColor));
      }
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
