import "./App.css";

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
  null: null,
};

function Square(props) {
  return (
    <td
      onClick={props.onClick}
      data-row={props.row}
      data-col={props.col}
      className={props.color}
    >
      {props.piece}
    </td>
  );
}

function Board() {
  let boardState = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ];

  const selectSquare = (e) => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    console.log(`Row: ${row}, Col: ${col}`);
  };

  return (
    <table>
      <tbody>
        {Array.from({ length: 8 }, (v, i) => i).map((row) => (
          <tr key={row}>
            {boardState[row].map((piece, col) => (
              <Square
                key={col}
                color={(row + col) % 2 === 0 ? "white" : "black"}
                row={row}
                col={col}
                piece={getPiece[piece]}
                onClick={selectSquare}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
