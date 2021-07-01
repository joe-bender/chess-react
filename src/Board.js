import { useState } from "react";
import Square from "./Square";
import {
  getPiece,
  boardStart,
  boardEmpty,
  boardUtil,
  targetsEmpty,
  targetsUtil,
} from "./data";
import { deepCopy, getTargets } from "./logic";

function Board() {
  const [board, setBoard] = useState(boardUtil);
  const [targets, setTargets] = useState(targetsEmpty);
  // attacked: all the squares that are attacked by enemy pieces (need one for each side)
  const [attackedByWhite, setAttackedByWhite] = useState(targetsEmpty);
  const [attackedByBlack, setAttackedByBlack] = useState(targetsEmpty);
  const [selected, setSelected] = useState({ row: -1, col: -1 });

  const selectSquare = (e) => {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    if (selected.row < 0 && selected.col < 0) {
      setSelected({ row, col });
      setTargets(getTargets(board[row][col], { row, col }, board));
    } else {
      let newBoard = deepCopy(board);
      let piece = newBoard[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;
      newBoard[row][col] = piece;
      setBoard(newBoard);
      setSelected({ row: -1, col: -1 });
      setTargets(targetsEmpty);
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
                  piece={getPiece[piece]}
                  onClick={selectSquare}
                  selected={row === selected.row && col === selected.col}
                  target={targets[row][col]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
