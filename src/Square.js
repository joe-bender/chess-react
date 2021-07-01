function Square(props) {
  let className = props.color;
  if (props.selected) {
    className = "selected";
  }
  if (props.target) {
    className = "target";
  }
  return (
    <td
      onClick={props.onClick}
      data-row={props.row}
      data-col={props.col}
      className={className}
    >
      {props.piece}
    </td>
  );
}

export default Square;
