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
                squareColor={
                  (row + col) % 2 === 0 ? "whiteSquare" : "blackSquare"
                }
                row={row}
                col={col}
                piece={piece}
                check={props.check}
                turn={props.turn}
                selected={
                  row === props.selected.row && col === props.selected.col
                }
                target={props.targets[row][col]}
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
