import { targetsEmpty } from "./data";

export function deepCopy(board) {
  return board.map((a) => a.slice());
}

export function getTargets(piece, loc, board) {
  switch (piece.type) {
    case "king":
      return getKingTargets(piece, loc, board);
    case "rook":
      return getRookTargets(piece, loc, board);
    case "bishop":
      return getBishopTargets(piece, loc, board);
    case "queen":
      return getQueenTargets(piece, loc, board);
    case "knight":
      return getKnightTargets(piece, loc, board);
    case "pawn":
      return getPawnTargets(piece, loc, board);
    default:
      return deepCopy(targetsEmpty);
  }
}

function seek(piece, loc, board, targets, move) {
  let row = loc.row + move.row;
  let col = loc.col + move.col;
  let getBounds = (move) => {
    if (move === 1) {
      return (x) => x < 8;
    } else if (move === -1) {
      return (x) => x >= 0;
    } else {
      return (x) => true;
    }
  };
  let fBoundsRow = getBounds(move.row);
  let fBoundsCol = getBounds(move.col);
  while (fBoundsRow(row) && fBoundsCol(col)) {
    if (board[row][col]) {
      if (board[row][col].color !== piece.color) {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row += move.row;
    col += move.col;
  }
  return targets;
}

function getRookTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  let moves = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
  ];
  for (const move of moves) {
    targets = seek(piece, loc, board, targets, move);
  }
  return targets;
}

function getBishopTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  let moves = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];
  for (const move of moves) {
    targets = seek(piece, loc, board, targets, move);
  }
  return targets;
}

function getQueenTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  let moves = [
    // rook moves:
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    // bishop moves:
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];
  for (const move of moves) {
    targets = seek(piece, loc, board, targets, move);
  }
  return targets;
}

function getKingTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        Math.abs(row - loc.row) <= 1 &&
        Math.abs(col - loc.col) <= 1 &&
        !(row === loc.row && col === loc.col) &&
        // can't target team pieces:
        (board[row][col] === null || board[row][col].color !== piece.color)
      ) {
        targets[row][col] = true;
      }
    }
  }
  return targets;
}

function getKnightTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        ((Math.abs(row - loc.row) === 2 && Math.abs(col - loc.col) === 1) ||
          (Math.abs(col - loc.col) === 2 && Math.abs(row - loc.row) === 1)) &&
        // can't target team pieces:
        (board[row][col] === null || board[row][col].color !== piece.color)
      ) {
        targets[row][col] = true;
      }
    }
  }
  return targets;
}

function getPawnTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  let forward = piece.color === "black" ? 1 : -1;
  let startRow = piece.color === "black" ? 1 : 6;
  // forward movement:
  if (!board[loc.row + forward][loc.col]) {
    targets[loc.row + forward][loc.col] = true;
    if (loc.row === startRow) {
      if (!board[loc.row + 2 * forward][loc.col]) {
        targets[loc.row + 2 * forward][loc.col] = true;
      }
    }
  }
  for (const side of [
    // left attack
    { bound: (col) => col > 0, dir: -1 },
    // right attack
    { bound: (col) => col < 7, dir: 1 },
  ]) {
    if (
      side.bound(loc.col) &&
      board[loc.row + forward][loc.col + side.dir] &&
      board[loc.row + forward][loc.col + side.dir].color !== piece.color
    ) {
      targets[loc.row + forward][loc.col + side.dir] = true;
    }
  }
  return targets;
}
