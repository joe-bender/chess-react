import { targetsEmpty } from "./data";

export function deepCopy(board) {
  return board.map((a) => a.slice());
}

export function getTargets(piece, loc, board) {
  let targets = deepCopy(targetsEmpty);
  switch (piece) {
    case "bk":
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
      break;
    case "br":
      // going down:
      let row = loc.row + 1;
      let col = loc.col;
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
      // going down:
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
      // for (let row = 0; row < 8; row++) {
      //   for (let col = 0; col < 8; col++) {
      //     if (
      //       (row === loc.row || col === loc.col) &&
      //       !(row === loc.row && col === loc.col) &&
      //       (board[row][col] === null || board[row][col][0] === "w")
      //     ) {
      //       targets[row][col] = true;
      //     }
      //   }
      // }
      break;
    case "bb":
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (
            (Math.abs(row - loc.row - (col - loc.col)) === 0 ||
              Math.abs(row - loc.row + (col - loc.col)) === 0) &&
            !(row === loc.row && col === loc.col)
          ) {
            targets[row][col] = true;
          }
        }
      }
      break;
    case "bq":
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (
            ((row === loc.row || col === loc.col) &&
              !(row === loc.row && col === loc.col)) ||
            ((Math.abs(row - loc.row - (col - loc.col)) === 0 ||
              Math.abs(row - loc.row + (col - loc.col)) === 0) &&
              !(row === loc.row && col === loc.col))
          ) {
            targets[row][col] = true;
          }
        }
      }
      break;
    case "bn":
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (
            (Math.abs(row - loc.row) === 2 && Math.abs(col - loc.col) === 1) ||
            (Math.abs(col - loc.col) === 2 && Math.abs(row - loc.row) === 1)
          ) {
            targets[row][col] = true;
          }
        }
      }
      break;
    case "bp":
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
      break;
    default:
      break;
  }

  return targets;
}
