import { classExpression } from "@babel/types";
import * as data from "./data";

function Square(props) {
  let classes = [props.squareColor];
  if (props.selected) {
    classes.push("selected");
  }
  if (props.target) {
    classes.push("target");
  }
  const pieceImg = props.piece ? data.pieceCode[props.piece.type] : null;
  if (props.piece) {
    const piece = props.piece;
    classes.push(piece.color);
    if (piece.type === "king" && piece.color === props.turn && props.check) {
      classes.push("check");
    }
  } else {
    classes.push("empty");
  }

  return (
    <td
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      data-row={props.row}
      data-col={props.col}
      className={classes.join(" ")}
    >
      {pieceImg}
      {/* <svg width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="green" />
      </svg> */}
    </td>
  );
}

export default Square;
