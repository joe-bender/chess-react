import Square from "./Square";

function Board(props) {
  return (
    <table>
      <tbody>
        {Array.from({ length: 8 }, (v, i) => i).map((row) => (
          <tr key={row}>
            {props.board[row].map((piece, col) => (
              <Square
                key={col}
                color={(row + col) % 2 === 0 ? "white" : "black"}
                row={row}
                col={col}
                piece={piece ? piece.code : null}
                onClick={props.onClick}
                selected={
                  row === props.selected.row && col === props.selected.col
                }
                target={props.targets[row][col]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
