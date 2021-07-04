import { targetsEmpty } from "./data";

export function deepCopy(board) {
  return board.map((a) => a.slice());
}

// doesn't consider results of moving to proposed targets
export function getTargets(piece, loc, board) {
  let targets;
  switch (piece.type) {
    case "king":
      targets = getKingTargets(piece, loc, board);
      break;
    case "rook":
      targets = getRookTargets(piece, loc, board);
      break;
    case "bishop":
      targets = getBishopTargets(piece, loc, board);
      break;
    case "queen":
      targets = getQueenTargets(piece, loc, board);
      break;
    case "knight":
      targets = getKnightTargets(piece, loc, board);
      break;
    case "pawn":
      targets = getPawnTargets(piece, loc, board);
      break;
    default:
      targets = deepCopy(targetsEmpty);
  }
  return targets;
}

// prevents moving into self-check positions
export function getValidTargets(piece, loc, board) {
  let targets = getTargets(piece, loc, board);
  targets = validateTargets(piece, board, loc, targets);
  // special moves:
  // castling:
  if (piece.type === "king" && !piece.hasMoved) {
    let row = piece.color === "black" ? 0 : 7;
    let rook;
    // right side:
    rook = board[row][7];
    if (
      rook &&
      rook.type === "rook" &&
      !rook.hasMoved &&
      !board[row][5] &&
      !board[row][6] &&
      !locIsThreatened(piece.color, { row, col: 5 }, board)
    ) {
      targets[row][6] = true;
    }
    // left side:
    rook = board[row][0];
    if (
      rook &&
      rook.type === "rook" &&
      !rook.hasMoved &&
      !board[row][1] &&
      !board[row][2] &&
      !board[row][3] &&
      !locIsThreatened(piece.color, { row, col: 3 }, board)
    ) {
      targets[row][2] = true;
    }
  }
  return targets;
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

function jump(piece, loc, board, squares) {
  let targets = deepCopy(targetsEmpty);
  for (const square of squares) {
    let row = loc.row + square.row;
    let col = loc.col + square.col;
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      if (board[row][col] === null || board[row][col].color !== piece.color) {
        targets[row][col] = true;
      }
    }
  }
  return targets;
}

function getKingTargets(piece, loc, board) {
  const squares = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ];
  let targets = jump(piece, loc, board, squares);
  return targets;
}

function getKnightTargets(piece, loc, board) {
  const squares = [
    { row: -1, col: -2 },
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 2, col: -1 },
    { row: 2, col: 1 },
    { row: 1, col: 2 },
  ];
  return jump(piece, loc, board, squares);
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
      (side.bound(loc.col) &&
        // normal attack
        board[loc.row + forward][loc.col + side.dir] &&
        board[loc.row + forward][loc.col + side.dir].color !== piece.color) ||
      // en passant
      (board[loc.row][loc.col + side.dir] &&
        board[loc.row][loc.col + side.dir].color !== piece.color &&
        board[loc.row][loc.col + side.dir].type === "pawn" &&
        board[loc.row][loc.col + side.dir].justJumped)
    ) {
      targets[loc.row + forward][loc.col + side.dir] = true;
    }
  }
  return targets;
}

export function resetJustJumped(board) {
  let newBoard = deepCopy(board);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (newBoard[row][col] && newBoard[row][col].type === "pawn") {
        newBoard[row][col].justJumped = false;
      }
    }
  }
  return newBoard;
}

export function validateTargets(piece, board, startLoc, targets) {
  let validTargets = deepCopy(targets);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (targets[row][col]) {
        validTargets[row][col] = validateMove(piece.color, board, startLoc, {
          row,
          col,
        });
      }
    }
  }
  return validTargets;
}

export function validateMove(color, board, startLoc, endLoc) {
  let tryBoard = makeMove(board, startLoc, endLoc);
  return !isInCheck(color, tryBoard);
}

export function makeMove(board, startLoc, endLoc) {
  let newBoard = deepCopy(board);
  let piece = newBoard[startLoc.row][startLoc.col];
  newBoard[startLoc.row][startLoc.col] = null;
  newBoard[endLoc.row][endLoc.col] = piece;
  return newBoard;
}

export function isInCheck(color, board) {
  return locIsThreatened(color, getKingLoc(color, board), board);
}

export function isMated(color, board) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        let validTargets = getValidTargets(piece, { row, col }, board);
        if (anyTrue(validTargets)) {
          return false;
        }
      }
    }
  }
  // if no valid moves found:
  return true;
}

export function anyTrue(targets) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (targets[row][col]) {
        return true;
      }
    }
  }
  return false;
}

export function getKingLoc(color, board) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color && piece.type === "king") {
        return { row, col };
      }
    }
  }
}

export function locIsThreatened(color, loc, board) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // if it's an enemy piece
      if (board[row][col] && board[row][col].color !== color) {
        let targets = getTargets(board[row][col], { row, col }, board);
        if (targets[loc.row][loc.col]) {
          return true;
        }
      }
    }
  }
  return false;
}
