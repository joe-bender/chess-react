import './App.css';

function getPiece(abbrev) {
  switch(abbrev) {
    case 'bp':
      return "\u265F";
    case 'br':
      return "\u265C";
    case 'bn':
      return "\u265E";
    case 'bb':
      return "\u265D";
    case 'bq':
      return "\u265B";
    case 'bk':
      return "\u265A";
    case 'wp':
      return "\u2659";
    case 'wr':
      return "\u2656";
    case 'wn':
      return "\u2658";
    case 'wb':
      return "\u2657";
    case 'wq':
      return "\u2655";
    case 'wk':
      return "\u2654";
    default:
      return;
  }
}

function Board() {
  let boardState = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
  ];

  return (
    <table>
      <tbody>
        <tr>
          <td className="white">{getPiece(boardState[0][0])}</td>
          <td className="black">{getPiece(boardState[0][1])}</td>
          <td className="white">{getPiece(boardState[0][2])}</td>
          <td className="black">{getPiece(boardState[0][3])}</td>
          <td className="white">{getPiece(boardState[0][4])}</td>
          <td className="black">{getPiece(boardState[0][5])}</td>
          <td className="white">{getPiece(boardState[0][6])}</td>
          <td className="black">{getPiece(boardState[0][7])}</td>
        </tr>
        <tr>
          <td className="black">{getPiece(boardState[1][0])}</td>
          <td className="white">{getPiece(boardState[1][1])}</td>
          <td className="black">{getPiece(boardState[1][2])}</td>
          <td className="white">{getPiece(boardState[1][3])}</td>
          <td className="black">{getPiece(boardState[1][4])}</td>
          <td className="white">{getPiece(boardState[1][5])}</td>
          <td className="black">{getPiece(boardState[1][6])}</td>
          <td className="white">{getPiece(boardState[1][7])}</td>
        </tr>
        <tr>
          <td className="white">{getPiece(boardState[2][0])}</td>
          <td className="black">{getPiece(boardState[2][1])}</td>
          <td className="white">{getPiece(boardState[2][2])}</td>
          <td className="black">{getPiece(boardState[2][3])}</td>
          <td className="white">{getPiece(boardState[2][4])}</td>
          <td className="black">{getPiece(boardState[2][5])}</td>
          <td className="white">{getPiece(boardState[2][6])}</td>
          <td className="black">{getPiece(boardState[2][7])}</td>
        </tr>
        <tr>
          <td className="black">{getPiece(boardState[3][0])}</td>
          <td className="white">{getPiece(boardState[3][1])}</td>
          <td className="black">{getPiece(boardState[3][2])}</td>
          <td className="white">{getPiece(boardState[3][3])}</td>
          <td className="black">{getPiece(boardState[3][4])}</td>
          <td className="white">{getPiece(boardState[3][5])}</td>
          <td className="black">{getPiece(boardState[3][6])}</td>
          <td className="white">{getPiece(boardState[3][7])}</td>
        </tr>
        <tr>
          <td className="white">{getPiece(boardState[4][0])}</td>
          <td className="black">{getPiece(boardState[4][1])}</td>
          <td className="white">{getPiece(boardState[4][2])}</td>
          <td className="black">{getPiece(boardState[4][3])}</td>
          <td className="white">{getPiece(boardState[4][4])}</td>
          <td className="black">{getPiece(boardState[4][5])}</td>
          <td className="white">{getPiece(boardState[4][6])}</td>
          <td className="black">{getPiece(boardState[4][7])}</td>
        </tr>
        <tr>
          <td className="black">{getPiece(boardState[5][0])}</td>
          <td className="white">{getPiece(boardState[5][1])}</td>
          <td className="black">{getPiece(boardState[5][2])}</td>
          <td className="white">{getPiece(boardState[5][3])}</td>
          <td className="black">{getPiece(boardState[5][4])}</td>
          <td className="white">{getPiece(boardState[5][5])}</td>
          <td className="black">{getPiece(boardState[5][6])}</td>
          <td className="white">{getPiece(boardState[5][7])}</td>
        </tr>
        <tr>
          <td className="white">{getPiece(boardState[6][0])}</td>
          <td className="black">{getPiece(boardState[6][1])}</td>
          <td className="white">{getPiece(boardState[6][2])}</td>
          <td className="black">{getPiece(boardState[6][3])}</td>
          <td className="white">{getPiece(boardState[6][4])}</td>
          <td className="black">{getPiece(boardState[6][5])}</td>
          <td className="white">{getPiece(boardState[6][6])}</td>
          <td className="black">{getPiece(boardState[6][7])}</td>
        </tr>
        <tr>
          <td className="black">{getPiece(boardState[7][0])}</td>
          <td className="white">{getPiece(boardState[7][1])}</td>
          <td className="black">{getPiece(boardState[7][2])}</td>
          <td className="white">{getPiece(boardState[7][3])}</td>
          <td className="black">{getPiece(boardState[7][4])}</td>
          <td className="white">{getPiece(boardState[7][5])}</td>
          <td className="black">{getPiece(boardState[7][6])}</td>
          <td className="white">{getPiece(boardState[7][7])}</td>
        </tr>
      </tbody>
    </table>
  )
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
