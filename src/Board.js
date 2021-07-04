import { useState } from "react";
import Square from "./Square";
import { boardStart, boardUtil, targetsEmpty, targetsUtil } from "./data";
import {
  deepCopy,
  getTargets,
  makeMove,
  isThreatened,
  getKingLoc,
  getValidTargets,
  isInCheck,
  isMated,
  anyTrue,
  resetJustJumped,
} from "./logic";

function Board() {
  const [board, setBoard] = useState(boardStart);
  const [targets, setTargets] = useState(targetsEmpty);
  const [selected, setSelected] = useState({ row: -1, col: -1 });
  const [turn, setTurn] = useState("white");
  const [check, setCheck] = useState(false);
  const [winner, setWinner] = useState(null);

  const selectSquare = (e) => {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    // if selecting an empty square:
    if (selected.row < 0 && selected.col < 0 && !board[row][col]) {
      return;
    }
    // if selecting a piece to move:
    else if (selected.row < 0 && selected.col < 0 && board[row][col]) {
      // if it's not that color's turn:
      if (turn !== board[row][col].color) {
        return;
      }
      setSelected({ row, col });
      setTargets(getValidTargets(board[row][col], { row, col }, board));
    }
    // if selecting a target square:
    else {
      // cancel move if selected square not a valid target:
      if (!targets[row][col]) {
        setSelected({ row: -1, col: -1 });
        setTargets(targetsEmpty);
        return;
      }
      // make move:
      const startLoc = { row: selected.row, col: selected.col };
      const endLoc = { row, col };
      let newBoard = deepCopy(board);
      // handle castling:
      let piece = newBoard[startLoc.row][startLoc.col];
      if (piece.type === "king" && Math.abs(startLoc.col - endLoc.col) === 2) {
        piece.hasMoved = true;
        if (endLoc.col === 6) {
          // mark right rook as moved:
          newBoard[startLoc.row][7].hasMoved = true;
          // move right rook:
          newBoard = makeMove(
            newBoard,
            { row: startLoc.row, col: 7 },
            { row: startLoc.row, col: 5 }
          );
        } else if (endLoc.col === 2) {
          // mark left rook as moved:
          newBoard[startLoc.row][0].hasMoved = true;
          // move left rook:
          newBoard = makeMove(
            newBoard,
            { row: startLoc.row, col: 0 },
            { row: startLoc.row, col: 3 }
          );
        }
        console.log("castling");
      }
      // prevent castling after moving relevant pieces:
      if (piece.type === "king" || piece.type === "rook") {
        piece.hasMoved = true;
      }
      // en passant:
      newBoard = resetJustJumped(newBoard);
      // if the current move is a pawn jump:
      if (Math.abs(endLoc.row - startLoc.row) === 2) {
        newBoard[startLoc.row][startLoc.col].justJumped = true;
      }
      // if current move is en-passant attack:
      if (
        // if moving diagonally:
        Math.abs(endLoc.row - startLoc.row) === 1 &&
        Math.abs(endLoc.col - startLoc.col) === 1 &&
        // if endLoc is empty
        !newBoard[endLoc.row][endLoc.col]
      ) {
        // remove captured pawn:
        newBoard[startLoc.row][endLoc.col] = null;
      }

      newBoard = makeMove(
        newBoard,
        { row: startLoc.row, col: startLoc.col },
        { row: endLoc.row, col: endLoc.col }
      );
      setBoard(newBoard);
      setSelected({ row: -1, col: -1 });
      setTargets(targetsEmpty);
      const enemy = turn === "white" ? "black" : "white";
      if (isInCheck(enemy, newBoard)) {
        setCheck(true);
      }
      if (isMated(enemy, newBoard)) {
        setWinner(turn);
        return;
      }
      setTurn((turn) => enemy);
    }
  };

  return (
    <div>
      <table>
        <tbody>
          {Array.from({ length: 8 }, (v, i) => i).map((row) => (
            <tr key={row}>
              {board[row].map((piece, col) => (
                <Square
                  key={col}
                  color={(row + col) % 2 === 0 ? "white" : "black"}
                  row={row}
                  col={col}
                  piece={piece ? piece.code : null}
                  onClick={selectSquare}
                  selected={row === selected.row && col === selected.col}
                  target={targets[row][col]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Turn: {turn}</p>
      <p>{check ? "Check!" : ""}</p>
      <p>{winner ? `${turn} wins!` : ""}</p>
    </div>
  );
}

export default Board;
