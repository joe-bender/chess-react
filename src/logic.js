import { targetsEmpty } from "./data";

export function deepCopy(board) {
  return board.map((a) => a.slice());
}

export function getTargets(piece, loc, board) {
  switch (piece) {
    case "bk":
      return getKingTargets(piece, loc, board);
    case "br":
      return getRookTargets(piece, loc, board);
    case "bb":
      return getBishopTargets(piece, loc, board);
    case "bq":
      return getQueenTargets(piece, loc, board);
    case "bn":
      return getKnightTargets(piece, loc, board);
    case "bp":
      return getPawnTargets(piece, loc, board);
    default:
      return deepCopy(targetsEmpty);
  }
}

function getRookTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  let row;
  let col;
  // going down:
  row = loc.row + 1;
  col = loc.col;
  while (row < 8) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row++;
  }
  // going up:
  row = loc.row - 1;
  col = loc.col;
  while (row >= 0) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row--;
  }
  // going right:
  row = loc.row;
  col = loc.col + 1;
  while (col < 8) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    col++;
  }
  // going left:
  row = loc.row;
  col = loc.col - 1;
  while (col >= 0) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    col--;
  }
  return targets;
}

function getBishopTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  let row;
  let col;
  // going down/right:
  row = loc.row + 1;
  col = loc.col + 1;
  while (row < 8 && col < 8) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row++;
    col++;
  }
  // going down/left:
  row = loc.row + 1;
  col = loc.col - 1;
  while (row < 8 && col >= 0) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row++;
    col--;
  }
  // going up/right:
  row = loc.row - 1;
  col = loc.col + 1;
  while (row >= 0 && col < 8) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row--;
    col++;
  }
  // going up/left:
  row = loc.row - 1;
  col = loc.col - 1;
  while (row >= 0 && col >= 0) {
    if (board[row][col]) {
      if (board[row][col][0] === "w") {
        targets[row][col] = true;
      }
      break;
    }
    targets[row][col] = true;
    row--;
    col--;
  }
  return targets;
}

function getQueenTargets(piece, loc, board) {
  let rookTargets = getRookTargets(piece, loc, board);
  let bishopTargets = getBishopTargets(piece, loc, board);
  let queenTargets = deepCopy(targetsEmpty);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      queenTargets[row][col] = rookTargets[row][col] || bishopTargets[row][col];
    }
  }
  return queenTargets;
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
        (board[row][col] === null || board[row][col][0] === "w")
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
        (board[row][col] === null || board[row][col][0] === "w")
      ) {
        targets[row][col] = true;
      }
    }
  }
  return targets;
}
function getPawnTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        col === loc.col &&
        row > loc.row &&
        row <= loc.row + (loc.row === 1 ? 2 : 1)
      ) {
        targets[row][col] = true;
      }
    }
  }
  return targets;
}
