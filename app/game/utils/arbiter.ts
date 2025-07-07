import { IMoveParams } from '../interfaces/IMoveParams';
import {
  getBishopMoves,
  getCastlingMoves,
  getKingMoves,
  getKingPosition,
  getKnightMoves,
  getPawnCaptures,
  getPawnMoves,
  getPieces,
  getQueenMoves,
  getRookMoves
} from './getMoves';
import { movePawn, movePiece } from './movePawn';

const arbiter = {
  getRegularMoves: function (
    rank: number,
    fileIndex: number,
    position: string[][],
    piece: string
  ) {
    if (piece.endsWith('r')) {
      return getRookMoves(rank, fileIndex, position, piece);
    }

    if (piece.endsWith('n')) {
      return getKnightMoves(rank, fileIndex, position);
    }

    if (piece.endsWith('b')) {
      return getBishopMoves(rank, fileIndex, position, piece);
    }

    if (piece.endsWith('q')) {
      return getQueenMoves(rank, fileIndex, position, piece);
    }

    if (piece.endsWith('k')) {
      return getKingMoves(rank, fileIndex, position, piece);
    }

    if (piece.endsWith('p')) {
      return [...getPawnMoves(rank, fileIndex, position, piece)];
    }

    return [];
  },

  getValidMoves: function ({
    position,
    castleDirection,
    prevPosition,
    piece,
    rank,
    file
  }: {
    position: string[][];
    castleDirection: string;
    prevPosition: string[][];
    piece: string;
    rank: number;
    file: number;
  }) {
    let moves = this.getRegularMoves(rank, file, position, piece);
    const notInCheckMoves: [number, number][] = [];

    if (piece.endsWith('p')) {
      moves = [
        ...moves,
        ...getPawnCaptures(rank, file, position, piece, prevPosition)
      ];
    }

    if (piece.endsWith('k')) {
      moves = [
        ...moves,
        ...getCastlingMoves({ position, castleDirection, piece, rank, file })
      ];
    }

    moves.forEach(([x, y]) => {
      const positionAfterMove = this.performMove({
        position,
        piece,
        rank,
        file,
        x,
        y
      });

      if (
        !this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })
      ) {
        notInCheckMoves.push([x, y]);
      }
    });
    return notInCheckMoves;
  },

  performMove: function ({ position, piece, rank, file, x, y }: IMoveParams) {
    if (piece.endsWith('p'))
      return movePawn({ position, piece, rank, file, x, y });
    else return movePiece({ position, piece, rank, file, x, y });
  },

  isPlayerInCheck: function ({
    positionAfterMove,
    position,
    player
  }: {
    positionAfterMove: string[][];
    position: string[][];
    player: string;
  }) {
    const enemy = player.startsWith('w') ? 'b' : 'w';
    const kingPos = getKingPosition(positionAfterMove, player);
    const enemyPieces = getPieces(positionAfterMove, enemy);

    const enemyMoves = enemyPieces.reduce(
      (acc, p) => {
        return [
          ...acc,
          ...(p.piece.endsWith('p')
            ? getPawnCaptures(
                p.rank,
                p.file,
                positionAfterMove,
                p.piece,
                position
              )
            : this.getRegularMoves(p.rank, p.file, positionAfterMove, p.piece))
        ];
      },
      [] as [number, number][]
    );

    if (!kingPos) return false;
    return enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y);
  }
};

export default arbiter;
