export const FILE_LENGTH = 8;
export const RANK_LENGTH = 8;

export const CASTLE_DESTINATION_SQUARES = {
    G1: "g1",
    C1: "c1",
    G8: "g8",
    C8: "c8"
}

export const MOVE_FLAGS = {
    KINGSIDE_CASTLE: "k",
    QUEENSIDE_CASTLE: "q",
    EN_PASSANT: "e"
}

export const backrank = [
      "rook",
      "knight",
      "bishop",
      "king",
      "queen",
      "bishop",
      "knight",
      "rook",
    ];

export const promotionPieceNotations = [
    "r", "q", "b", "n"
]

export const whitePieceIds = [
      "wr1",
      "wn1",
      "wb1",
      "wq1",
      "wk1",
      "wb2",
      "wn2",
      "wr2",
    ];

export const whitePawnIds = [
      "wp1",
      "wp2",
      "wp3",
      "wp4",
      "wp5",
      "wp6",
      "wp7",
      "wp8",
    ];

export const blackPieceIds = [
      "br1",
      "bn1",
      "bb1",
      "bq1",
      "bk1",
      "bb2",
      "bn2",
      "br2",
    ];

export const blackPawnIds = [
      "bp1",
      "bp2",
      "bp3",
      "bp4",
      "bp5",
      "bp6",
      "bp7",
      "bp8",
    ];

export const PROMOTION_PIECES = [
  {
    pieceName: "queen"
  },
  {
    pieceName: "rook"
  },
  {
    pieceName: "knight"
  },
  {
    pieceName: "bishop"
  }
]

export const coordToRank: {[key: number]: string} = {
  0: "1",
  1: "2", 
  2: "3",
  3: "4", 
  4: "5",
  5: "6",
  6: "7",
  7: "8"
}

export const coordToFile: {[key: number]: string} = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h"
}
