import { targetsEmpty } from "./data";

export function deepCopy(board) {
  return board.map((a) => a.slice());
}

export function getTargets(piece, loc) {
  let targets = deepCopy(targetsEmpty);
  switch (piece) {
    case "bk":
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (
            Math.abs(row - loc.row) <= 1 &&
            Math.abs(col - loc.col) <= 1 &&
            !(row === loc.row && col === loc.col)
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
