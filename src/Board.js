import { useState } from "react";
import Square from "./Square";
import { boardStart, boardUtil, targetsEmpty } from "./data";
import {
  deepCopy,
  getTargets,
  makeMove,
  isThreatened,
  getKingLoc,
} from "./logic";

function Board() {
  const [board, setBoard] = useState(boardStart);
  const [targets, setTargets] = useState(targetsEmpty);
  // attacked: all the squares that are attacked by enemy pieces (need one for each side)
  // const [attackedByWhite, setAttackedByWhite] = useState(targetsEmpty);
  // const [attackedByBlack, setAttackedByBlack] = useState(targetsEmpty);
  const [selected, setSelected] = useState({ row: -1, col: -1 });
  const [turn, setTurn] = useState("white");

  const selectSquare = (e) => {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    // if selecting an empty square:
    if (selected.row < 0 && selected.col < 0 && !board[row][col]) {
      // do nothing
    }
    // if selecting a piece to move:
    else if (selected.row < 0 && selected.col < 0 && board[row][col]) {
      if (turn !== board[row][col].color) {
        return;
      }
      setSelected({ row, col });
      setTargets(getTargets(board[row][col], { row, col }, board));
    }
    // if selecting a target square:
    else {
      // cancel move if selected square not a valid target:
      if (!targets[row][col]) {
        setSelected({ row: -1, col: -1 });
        setTargets(targetsEmpty);
        return;
      }
      console.log(
        isThreatened(
          board[selected.row][selected.col],
          { row: selected.row, col: selected.col },
          { row, col },
          board
        )
      );
      // make move:
      let newBoard = makeMove(
        board,
        { row: selected.row, col: selected.col },
        { row, col }
      );
      setBoard(newBoard);
      setSelected({ row: -1, col: -1 });
      setTargets(targetsEmpty);
      setTurn((turn) => (turn === "white" ? "black" : "white"));
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
      <h2>Turn: {turn}</h2>
    </div>
  );
}

export default Board;
