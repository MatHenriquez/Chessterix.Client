export const createInitialPosition = () => {
  const position = new Array(8).fill('').map(() => new Array(8).fill(''));

  position[0] = ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'];
  position[1] = ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'];
  position[6] = ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'];
  position[7] = ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'];

  return position;
};

export const copyPosition = (position: string[][]): string[][] => {
  const newPosition = new Array(8).fill('').map(() => new Array(8).fill(''));

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      newPosition[i][j] = position[i][j];
    }
  }

  return newPosition;
};

export const getCharacter = (file: number) => String.fromCharCode(file + 96);

export const areSameColorTiles = (
  coords1: { x: number; y: number },
  coords2: { x: number; y: number }
) => (coords1.x + coords1.y) % 2 === coords2.x + coords2.y;

export const findPieceCoords = (position: string[][], type: string) => {
  const results: { x: number; y: number }[] = [];
  position.forEach((rank, i) => {
    rank.forEach((pos, j) => {
      if (pos === type) results.push({ x: i, y: j });
    });
  });
  return results;
};

export const getNewMoveNotation = ({
  piece,
  rank,
  file,
  x,
  y,
  position,
  promotesTo
}: {
  piece: string;
  rank: number | string;
  file: number | string;
  x: number;
  y: number;
  position: string[][];
  promotesTo?: string;
}) => {
  let note = '';

  rank = Number(rank);
  file = Number(file);
  if (piece[1] === 'k' && Math.abs(file - y) === 2) {
    if (file < y) return 'O-O';
    else return 'O-O-O';
  }

  if (piece[1] !== 'p') {
    note += piece[1].toUpperCase();
    if (position[x][y]) {
      note += 'x';
    }
  } else if (rank !== x && file !== y) {
    note += getCharacter(file + 1) + 'x';
  }

  note += getCharacter(y + 1) + (x + 1);

  if (promotesTo) note += '=' + promotesTo.toUpperCase();

  return note;
};
