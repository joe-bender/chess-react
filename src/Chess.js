import { useState } from "react";
import PromoChoice from "./PromoChoice";
import Board from "./Board";
import * as data from "./data";
import * as logic from "./logic";

function Chess() {
  const [board, setBoard] = useState(data.boardStart);
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
          setTargets(
            logic.getValidTargets(board[row][col], { row, col }, board)
          );
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
    let newBoard = logic.deepCopy(board);

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
    newBoard = logic.handleCastling(newBoard, startLoc, endLoc);
    newBoard = logic.handleEnPassant(newBoard, startLoc, endLoc);
    // newBoard = handlePromotion(newBoard, startLoc, endLoc);
    newBoard = logic.makeMove(newBoard, startLoc, endLoc);
    // pawn promotion:
    let pLoc = logic.needsPromotion(board, startLoc, endLoc);
    if (pLoc) {
      setPromoLoc(pLoc);
      setChoosingPromo(true);
      newBoard[pLoc.row][pLoc.col] = { color: turn, type: "promo" };
      setBoard(newBoard);
      resetSelection();
      return;
    }
    setBoard(newBoard);
    switchTurn(newBoard);
  };

  const resetSelection = () => {
    setSelected({ row: -1, col: -1 });
    setTargets(data.targetsEmpty);
  };

  const handlePromoPick = (choice) => {
    let newBoard = logic.deepCopy(board);
    newBoard[promoLoc.row][promoLoc.col] = data.getPiece(turn, choice);
    setChoosingPromo(false);
    setBoard(newBoard);
    switchTurn(newBoard);
  };

  const switchTurn = (newBoard) => {
    const enemy = turn === "white" ? "black" : "white";
    if (logic.isInCheck(enemy, newBoard)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    if (logic.isMated(enemy, newBoard)) {
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

  // show the hovered piece's info:
  // const logPiece = (e) => {
  //   const row = parseInt(e.target.dataset.row);
  //   const col = parseInt(e.target.dataset.col);
  //   console.log(board[row][col]);
  // };

  const showTargets = (e) => {
    if (selected.row < 0 && selected.col < 0) {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
      if (board[row][col] && board[row][col].color === turn) {
        setTargets(logic.getValidTargets(board[row][col], { row, col }, board));
      }
    }
  };

  const hideTargets = () => {
    if (selected.row < 0 && selected.col < 0) {
      setTargets(data.targetsEmpty);
    }
  };

  return (
    <div>
      <Board
        board={board}
        check={check}
        turn={turn}
        onClick={selectSquare}
        selected={selected}
        targets={targets}
        onMouseEnter={showTargets}
        onMouseLeave={hideTargets}
      />
      {choosingPromo && <PromoChoice onChange={handlePromoPick} />}
      <p>{!winner ? `Turn: ${turn}` : ""}</p>
      <p>{check && !winner ? "Check!" : ""}</p>
      <p>{winner ? `${winner} wins!` : ""}</p>
      <button type="button" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export default Chess;
