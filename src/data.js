const bp = { color: "black", type: "pawn", code: "\u265F" };
const br = () => ({
  color: "black",
  type: "rook",
  code: "\u265C",
  hasMoved: false,
});
const bn = { color: "black", type: "knight", code: "\u265E" };
const bb = { color: "black", type: "bishop", code: "\u265D" };
const bq = { color: "black", type: "queen", code: "\u265B" };
const bk = { color: "black", type: "king", code: "\u265A", hasMoved: false };
const wp = { color: "white", type: "pawn", code: "\u2659" };
const wr = { color: "white", type: "rook", code: "\u2656", hasMoved: false };
const wn = { color: "white", type: "knight", code: "\u2658" };
const wb = { color: "white", type: "bishop", code: "\u2657" };
const wq = { color: "white", type: "queen", code: "\u2655" };
const wk = { color: "white", type: "king", code: "\u2654", hasMoved: false };

export const boardStart = [
  [br(), bn, bb, bq, bk, bb, bn, br()],
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
  [br(), null, null, null, bk, null, null, br()],
  [bp, bp, bp, null, bp, null, null, bp],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [wp, wp, wp, wp, wp, wp, wp, wp],
  [wr, null, null, null, wk, null, null, wr],
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
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, true],
];
