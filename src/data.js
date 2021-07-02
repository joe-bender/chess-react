export const getPiece = {
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

const bp = { color: "black", type: "pawn", code: "\u265F" };
const br = { color: "black", type: "rook", code: "\u265C" };
const bn = { color: "black", type: "knight", code: "\u265E" };
const bb = { color: "black", type: "bishop", code: "\u265D" };
const bq = { color: "black", type: "queen", code: "\u265B" };
const bk = { color: "black", type: "king", code: "\u265A" };
const wp = { color: "white", type: "pawn", code: "\u2659" };
const wr = { color: "white", type: "rook", code: "\u2656" };
const wn = { color: "white", type: "knight", code: "\u2658" };
const wb = { color: "white", type: "bishop", code: "\u2657" };
const wq = { color: "white", type: "queen", code: "\u2655" };
const wk = { color: "white", type: "king", code: "\u2654" };

export const boardStart = [
  [br, bn, bb, bq, bk, bb, bn, br],
  [bp, bp, bp, bp, bp, bp, bp, bp],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [wp, wp, wp, wp, wp, wp, wp, wp],
  [wr, wn, wb, wq, wk, wb, wn, wr],
];

export const boardEmpty = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

export const boardUtil = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

export const targetsEmpty = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];

export const targetsUtil = [
  [true, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];
