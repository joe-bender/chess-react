import "./App.css";

function getPiece(abbrev) {
  switch (abbrev) {
    case "bp":
      return "\u265F";
    case "br":
      return "\u265C";
    case "bn":
      return "\u265E";
    case "bb":
      return "\u265D";
    case "bq":
      return "\u265B";
    case "bk":
      return "\u265A";
    case "wp":
      return "\u2659";
    case "wr":
      return "\u2656";
    case "wn":
      return "\u2658";
    case "wb":
      return "\u2657";
    case "wq":
      return "\u2655";
    case "wk":
      return "\u2654";
    default:
      return;
  }
}

function Square(props) {
  return <td className={props.color}>{props.piece}</td>;
}

function Row(props) {
  if (props.startWhite) {
    return (
      <tr>
        <Square color="white" piece={props.pieces[0]} />
        <Square color="black" piece={props.pieces[1]} />
        <Square color="white" piece={props.pieces[2]} />
        <Square color="black" piece={props.pieces[3]} />
        <Square color="white" piece={props.pieces[4]} />
        <Square color="black" piece={props.pieces[5]} />
        <Square color="white" piece={props.pieces[6]} />
        <Square color="black" piece={props.pieces[7]} />
      </tr>
    );
  }
  return (
    <tr>
      <Square color="black" piece={props.pieces[0]} />
      <Square color="white" piece={props.pieces[1]} />
      <Square color="black" piece={props.pieces[2]} />
      <Square color="white" piece={props.pieces[3]} />
      <Square color="black" piece={props.pieces[4]} />
      <Square color="white" piece={props.pieces[5]} />
      <Square color="black" piece={props.pieces[6]} />
      <Square color="white" piece={props.pieces[7]} />
    </tr>
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

  return (
    <table>
      <tbody>
        <Row startWhite={true} pieces={boardState[0].map(getPiece)} />
        <Row startWhite={false} pieces={boardState[1].map(getPiece)} />
        <Row startWhite={true} pieces={boardState[2].map(getPiece)} />
        <Row startWhite={false} pieces={boardState[3].map(getPiece)} />
        <Row startWhite={true} pieces={boardState[4].map(getPiece)} />
        <Row startWhite={false} pieces={boardState[5].map(getPiece)} />
        <Row startWhite={true} pieces={boardState[6].map(getPiece)} />
        <Row startWhite={false} pieces={boardState[7].map(getPiece)} />
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
