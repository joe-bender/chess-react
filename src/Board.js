import { useState } from "react";
import Square from "./Square";
import PromoChoice from "./PromoChoice";
import * as data from "./data";
import {
  deepCopy,
  makeMove,
  getValidTargets,
  isInCheck,
  isMated,
  handleCastling,
  handleEnPassant,
  needsPromotion,
} from "./logic";

function Board() {
  const [board, setBoard] = useState(data.boardUtil);
  const [targets, setTargets] = useState(data.targetsEmpty);
  const [selected, setSelected] = useState({ row: -1, col: -1 });
  const [turn, setTurn] = useState("white");
  const [check, setCheck] = useState(false);
  const [winner, setWinner] = useState(null);
  const [choosingPromo, setChoosingPromo] = useState(false);
  const [promoLoc, setPromoLoc] = useState(null);

  const selectSquare = (e) => {
    // don't allow selections if player is still choosing a promo piece:
    if (choosingPromo) {
      return;
    }
    // can't select piece to move if game is over:
    if (winner) {
      return;
    }
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    // if no piece has been selected yet:
    if (selected.row < 0 && selected.col < 0) {
      // if selecting an empty square:
      if (!board[row][col]) {
        return;
      }
      // if selecting a piece to move:
      if (board[row][col]) {
        if (turn === board[row][col].color) {
          setSelected({ row, col });
          setTargets(getValidTargets(board[row][col], { row, col }, board));
        }
        return;
      }
    } else {
      // if selecting a target square:
      const startLoc = { row: selected.row, col: selected.col };
      const endLoc = { row, col };
      move(board, startLoc, endLoc);
      resetSelection();
    }
  };

  const move = (board, startLoc, endLoc) => {
    let newBoard = deepCopy(board);

    // debug: delete piece if double-clicked:
    // if (startLoc.row === endLoc.row && startLoc.col === endLoc.col) {
    //   newBoard[startLoc.row][startLoc.col] = null;
    //   setBoard(newBoard);
    //   return;
    // }

    // cancel move if selected square not a valid target:
    if (!targets[endLoc.row][endLoc.col]) {
      return;
    }
    newBoard = handleCastling(newBoard, startLoc, endLoc);
    newBoard = handleEnPassant(newBoard, startLoc, endLoc);
    // newBoard = handlePromotion(newBoard, startLoc, endLoc);
    newBoard = makeMove(newBoard, startLoc, endLoc);
    // pawn promotion:
    let pLoc = needsPromotion(board, startLoc, endLoc);
    if (pLoc) {
      setPromoLoc(pLoc);
      setChoosingPromo(true);
      newBoard[pLoc.row][pLoc.col] = { code: "?" };
      setBoard(newBoard);
      resetSelection();
      return;
    }
    setBoard(newBoard);
    const enemy = turn === "white" ? "black" : "white";
    if (isInCheck(enemy, newBoard)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    if (isMated(enemy, newBoard)) {
      setWinner(turn);
      return;
    }
    setTurn((turn) => enemy);
  };

  const resetSelection = () => {
    setSelected({ row: -1, col: -1 });
    setTargets(data.targetsEmpty);
  };

  const getPromoChoice = (color, choice) => {
    if (color === "white") {
      switch (choice) {
        case "queen":
          return data.wq();
        case "rook":
          return data.wr();
        case "bishop":
          return data.wb();
        case "knight":
          return data.wn();
        default:
          return data.wq();
      }
    } else {
      switch (choice) {
        case "queen":
          return data.bq();
        case "rook":
          return data.br();
        case "bishop":
          return data.bb();
        case "knight":
          return data.bn();
        default:
          return data.bq();
      }
    }
  };

  const handlePromoPick = (choice) => {
    let newBoard = deepCopy(board);
    newBoard[promoLoc.row][promoLoc.col] = getPromoChoice(turn, choice);
    setBoard(newBoard);
    setChoosingPromo(false);
    const enemy = turn === "white" ? "black" : "white";
    if (isInCheck(enemy, newBoard)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    if (isMated(enemy, newBoard)) {
      setWinner(turn);
      return;
    }
    setTurn((turn) => enemy);
  };

  const newGame = () => {
    setBoard(data.boardStart);
    setTurn("white");
    resetSelection();
    setCheck(false);
    setWinner(null);
  };

  return (
    <div>
      {choosingPromo && <PromoChoice onChange={handlePromoPick} />}
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
      <p>{!winner ? `Turn: ${turn}` : ""}</p>
      <p>{check && !winner ? "Check!" : ""}</p>
      <p>{winner ? `${winner} wins!` : ""}</p>
      <button type="button" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export default Board;
