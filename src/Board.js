import { useState } from "react";
import Square from "./Square";
import { boardStart, boardUtil, targetsEmpty } from "./data";
import {
  deepCopy,
  makeMove,
  getValidTargets,
  isInCheck,
  isMated,
  handleCastling,
  handleEnPassant,
  handlePromotion,
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
    // if no piece has been selected yet:
    if (selected.row < 0 && selected.col < 0) {
      // if selecting an empty square:
      if (!board[row][col]) {
        return;
      }
      // if selecting a piece to move:
      if (board[row][col]) {
        if (turn === board[row][col].color) {
          setSelected({ row, col });
          setTargets(getValidTargets(board[row][col], { row, col }, board));
        }
        return;
      }
    } else {
      // if selecting a target square:
      const startLoc = { row: selected.row, col: selected.col };
      const endLoc = { row, col };
      move(board, startLoc, endLoc);
      resetSelection();
    }
  };

  const move = (board, startLoc, endLoc) => {
    let newBoard = deepCopy(board);

    // debug: delete piece if double-clicked:
    // if (startLoc.row === endLoc.row && startLoc.col === endLoc.col) {
    //   newBoard[startLoc.row][startLoc.col] = null;
    //   setBoard(newBoard);
    //   return;
    // }

    // cancel move if selected square not a valid target:
    if (!targets[endLoc.row][endLoc.col]) {
      return;
    }
    newBoard = handleCastling(newBoard, startLoc, endLoc);
    newBoard = handleEnPassant(newBoard, startLoc, endLoc);
    newBoard = handlePromotion(newBoard, startLoc, endLoc);
    newBoard = makeMove(newBoard, startLoc, endLoc);
    setBoard(newBoard);
    const enemy = turn === "white" ? "black" : "white";
    if (isInCheck(enemy, newBoard)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    if (isMated(enemy, newBoard)) {
      setWinner(turn);
      return;
    }
    setTurn((turn) => enemy);
  };

  const resetSelection = () => {
    setSelected({ row: -1, col: -1 });
    setTargets(targetsEmpty);
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
