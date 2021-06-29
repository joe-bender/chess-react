import "./App.css";
import { useState } from "react";

const getPiece = {
  bp: "\u265F",
  br: "\u265C",
  bn: "\u265E",
  bb: "\u265D",
  bq: "\u265B",
  bk: "\u265A",
  wp: "\u2659",
  wr: "\u2656",
  wn: "\u2658",
  wb: "\u2657",
  wq: "\u2655",
  wk: "\u2654",
};

function Square(props) {
  return (
    <td
      onClick={props.onClick}
      data-row={props.row}
      data-col={props.col}
      className={props.selected ? "selected" : props.color}
    >
      {props.piece}
    </td>
  );
}

function Board() {
  const [board, setBoard] = useState([
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ]);
  const [selected, setSelected] = useState({ row: -1, col: -1 });

  const selectSquare = (e) => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    if (selected.row < 0 && selected.col < 0) {
      setSelected({ row: parseInt(row), col: parseInt(col) });
    } else {
      let newBoard = board.slice();
      let piece = newBoard[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;
      newBoard[row][col] = piece;
      setBoard(newBoard);
      setSelected({ row: -1, col: -1 });
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
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>
        {selected.row}, {selected.col}
      </h1>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Chess</h1>
      <Board />
    </div>
  );
}

export default App;
