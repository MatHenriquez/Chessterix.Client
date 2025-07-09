import arbiter from './arbiter';

export const getRookMoves = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][],
  piece: string
) => {
  const moves: [number, number][] = [];
  const currentPlayer = piece[0];
  const opponent = currentPlayer === 'w' ? 'b' : 'w';

  const rooksDirections = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  rooksDirections.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * direction[0];
      const y = fileIndex + i * direction[1];

      const isOutOfBoard = currentPosition?.[x]?.[y] === undefined;
      if (isOutOfBoard) {
        break;
      }

      if (currentPosition[x][y].startsWith(opponent)) {
        moves.push([x, y]);
        break;
      }

      const isOccupiedByAlly = currentPosition[x][y].startsWith(currentPlayer);

      if (isOccupiedByAlly) {
        break;
      }

      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKnightMoves = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][]
) => {
  const moves: [number, number][] = [];
  const currentPlayer = currentPosition[rank][fileIndex][0];
  const opponent = currentPlayer === 'w' ? 'b' : 'w';

  const candidates = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1]
  ];

  candidates.forEach((candidate) => {
    const newRank = rank + candidate[0];
    const newFile = fileIndex + candidate[1];

    if (newRank < 0 || newRank > 7 || newFile < 0 || newFile > 7) {
      return;
    }

    const cell = currentPosition[newRank][newFile];

    if (cell === '' || cell.startsWith(opponent)) {
      moves.push([newRank, newFile]);
    }
  });

  return moves;
};

export const getBishopMoves = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][],
  piece: string
) => {
  const moves: [number, number][] = [];
  const currentPlayer = piece[0];
  const opponent = currentPlayer === 'w' ? 'b' : 'w';

  const bishopsDirections = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];

  bishopsDirections.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * direction[0];
      const y = fileIndex + i * direction[1];

      const isOutOfBoard = currentPosition?.[x]?.[y] === undefined;
      if (isOutOfBoard) {
        break;
      }

      if (currentPosition[x][y].startsWith(opponent)) {
        moves.push([x, y]);
        break;
      }

      const isOccupiedByAlly = currentPosition[x][y].startsWith(currentPlayer);

      if (isOccupiedByAlly) {
        break;
      }

      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKingMoves = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][],
  piece: string
) => {
  const moves: [number, number][] = [];
  const currentPlayer = piece[0];

  const kingsDirections = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];

  kingsDirections.forEach((direction) => {
    const x = rank + direction[0];
    const y = fileIndex + direction[1];

    const isOutOfBoard = currentPosition?.[x]?.[y] === undefined;
    if (isOutOfBoard) {
      return;
    }

    const isOccupied = currentPosition[x][y].startsWith(currentPlayer);
    if (!isOccupied) {
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getQueenMoves = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][],
  piece: string
) => [
  ...getRookMoves(rank, fileIndex, currentPosition, piece),
  ...getBishopMoves(rank, fileIndex, currentPosition, piece)
];

export const getPawnMoves = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][],
  piece: string
) => {
  const moves: [number, number][] = [];
  const direction = piece === 'wp' ? 1 : -1;

  const oneStepForward = rank + direction;

  if (oneStepForward >= 0 && oneStepForward <= 7) {
    if (currentPosition[oneStepForward][fileIndex] === '') {
      moves.push([oneStepForward, fileIndex]);

      const isStartingPosition =
        (piece === 'wp' && rank === 1) || (piece === 'bp' && rank === 6);
      const twoStepsForward = rank + direction * 2;

      if (isStartingPosition && twoStepsForward >= 0 && twoStepsForward <= 7) {
        if (currentPosition[twoStepsForward][fileIndex] === '') {
          moves.push([twoStepsForward, fileIndex]);
        }
      }
    }
  }

  return moves;
};

export const getPawnCaptures = (
  rank: number,
  fileIndex: number,
  currentPosition: string[][],
  piece: string,
  previousPosition: string[][]
) => {
  const moves: [number, number][] = [];
  const direction = piece === 'wp' ? 1 : -1;
  const enemy = piece.startsWith('w') ? 'b' : 'w';

  const diagonalFiles = [fileIndex - 1, fileIndex + 1];
  diagonalFiles.forEach((file) => {
    if (file >= 0 && file <= 7) {
      const targetRank = rank + direction;
      if (targetRank >= 0 && targetRank <= 7) {
        const targetPiece = currentPosition[targetRank]?.[file];
        if (targetPiece?.startsWith(enemy)) {
          moves.push([targetRank, file]);
        }
      }
    }
  });

  if (previousPosition) {
    const enPassantRank = piece === 'wp' ? 4 : 3;

    if (rank === enPassantRank) {
      diagonalFiles.forEach((file) => {
        if (file >= 0 && file <= 7) {
          const enemyPawn = enemy + 'p';
          const currentEnemyPiece = currentPosition[rank]?.[file];
          const previousEnemyPosition = previousPosition[rank]?.[file];

          const enemyStartRank = enemy === 'w' ? 1 : 6;
          const previousEnemyStartPosition =
            previousPosition[enemyStartRank]?.[file];

          const condition1 = currentEnemyPiece === enemyPawn;
          const condition2 = previousEnemyPosition === '';
          const condition3 = previousEnemyStartPosition === enemyPawn;

          if (condition1 && condition2 && condition3) {
            moves.push([rank + direction, file]);
          }
        }
      });
    }
  }

  return moves;
};

export const getCastlingMoves = ({
  position,
  castleDirection,
  piece,
  rank,
  file
}: {
  position: string[][];
  castleDirection: string;
  piece: string;
  rank: number;
  file: number;
}) => {
  const moves: [number, number][] = [];

  if (file !== 4 || rank % 7 !== 0 || castleDirection === 'none') {
    return moves;
  }
  if (piece.startsWith('w')) {
    if (
      arbiter.isPlayerInCheck({
        positionAfterMove: position,
        position: position,
        player: 'w'
      })
    )
      return moves;

    if (
      ['left', 'both'].includes(castleDirection) &&
      !position[0][3] &&
      !position[0][2] &&
      !position[0][1] &&
      position[0][0] === 'wr' &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 0,
          y: 3
        }),
        position: position,
        player: 'w'
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 0,
          y: 2
        }),
        position: position,
        player: 'w'
      })
    ) {
      moves.push([0, 2]);
    }
    if (
      ['right', 'both'].includes(castleDirection) &&
      !position[0][5] &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 0,
          y: 5
        }),
        position: position,
        player: 'w'
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 0,
          y: 6
        }),
        position: position,
        player: 'w'
      })
    ) {
      moves.push([0, 6]);
    }
  } else {
    if (
      arbiter.isPlayerInCheck({
        positionAfterMove: position,
        position: position,
        player: 'b'
      })
    )
      return moves;

    if (
      ['left', 'both'].includes(castleDirection) &&
      !position[7][3] &&
      !position[7][2] &&
      !position[7][1] &&
      position[7][0] === 'br' &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 7,
          y: 3
        }),
        position: position,
        player: 'b'
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 7,
          y: 2
        }),
        position: position,
        player: 'b'
      })
    ) {
      moves.push([7, 2]);
    }
    if (
      ['right', 'both'].includes(castleDirection) &&
      !position[7][5] &&
      !position[7][6] &&
      position[7][7] === 'br' &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 7,
          y: 5
        }),
        position: position,
        player: 'b'
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          position,
          piece,
          rank,
          file,
          x: 7,
          y: 6
        }),
        position: position,
        player: 'b'
      })
    ) {
      moves.push([7, 6]);
    }
  }

  return moves;
};

export const getKingPosition = (
  position: string[][],
  player: string
): [number, number] | null => {
  let playerPrefix: string;

  if (player === 'white' || player === 'w') {
    playerPrefix = 'w';
  } else if (player === 'black' || player === 'b') {
    playerPrefix = 'b';
  } else {
    console.error('Invalid player format:', player);
    return null;
  }

  for (let x = 0; x < position.length; x++) {
    for (let y = 0; y < position[x].length; y++) {
      const piece = position[x][y];

      if (piece.startsWith(playerPrefix) && piece.endsWith('k')) {
        return [x, y];
      }
    }
  }

  return null;
};

export const getPieces = (position: string[][], enemy: string) => {
  const enemyPieces: { piece: string; rank: number; file: number }[] = [];
  position.forEach((rank, x) => {
    rank.forEach((file, y) => {
      if (position[x][y].startsWith(enemy))
        enemyPieces.push({
          piece: position[x][y],
          rank: x,
          file: y
        });
    });
  });

  return enemyPieces;
};
