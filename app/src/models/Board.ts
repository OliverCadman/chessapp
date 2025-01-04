import Square from "./Square";
import Piece from "./Piece";

import { Chess } from "chess.js";

class Board {
  playerIsWhite: boolean;
  boardInterface: Square[][];
  chess: Chess;

  constructor(playerIsWhite: boolean) {
    this.playerIsWhite = playerIsWhite;
    this.boardInterface = this.init();

    // Initialize ChessJS engine
    this.chess = new Chess();
  }

  canCastle() {}

  promote() {}

  makeMove(piece: Piece) {}

  canMakeMove() {}

  getBoard() {
    return this.boardInterface;
  }

  reverseArray(arr: string[]) {
    const reversedArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversedArr.push(arr[i]);
    }

    return reversedArr;
  }

  init() {
    const board: Square[][] = [];

    const FILES: string[] = this.playerIsWhite
      ? ["a", "b", "c", "d", "e", "f", "g", "h"]
      : ["h", "g", "f", "e", "d", "c", "b", "a"];

    const RANKS: string[] = this.playerIsWhite
      ? ["1", "2", "3", "4", "5", "6", "7", "8"]
      : ["8", "7", "6", "5", "4", "3", "2", "1"];

    const rankToCoord: { [key: number]: number } = {
      7: 0,
      6: 1,
      5: 2,
      4: 3,
      3: 4,
      2: 5,
      1: 6,
      0: 7,
    };

    const backrank = [
      "rook",
      "knight",
      "bishop",
      "king",
      "queen",
      "bishop",
      "knight",
      "rook",
    ];

    const whitePieceIds = [
      "wr1",
      "wn1",
      "wb1",
      "wq1",
      "wk1",
      "wb2",
      "wn2",
      "wr2",
    ];

    const whitePawnIds = [
      "wp1",
      "wp2",
      "wp3",
      "wp4",
      "wp5",
      "wp6",
      "wp7",
      "wp8",
    ];

    const blackPieceIds = [
      "br1",
      "bn1",
      "bb1",
      "bk1",
      "bq1",
      "bb2",
      "bn2",
      "br2",
    ];

    const blackPawnIds = [
      "bp1",
      "bp2",
      "bp3",
      "bp4",
      "bp5",
      "bp6",
      "bp7",
      "bp8",
    ];

    for (let i = 0; i < FILES.length; i++) {
      board.push([]);
      for (let j = 0; j < RANKS.length; j++) {
        board[i].push(
          new Square(
            { x: rankToCoord[j], y: i },
            this.reverseArray(FILES)[j] + RANKS[i],
            null,
          ),
        );
      }
    }

    for (let i = 0; i < FILES.length; i++) {
      for (let j = 0; j < RANKS.length; j++) {
        if (i === 0) {
          board[i][this.playerIsWhite ? j : 7 - j].setPiece(
            new Piece(
              this.playerIsWhite ? "white" : "black",
              this.playerIsWhite
                ? this.reverseArray(whitePieceIds)[j]
                : this.reverseArray(blackPieceIds)[j],
              backrank[j],
            ),
          );

          board[i + 1][this.playerIsWhite ? j : 7 - j].setPiece(
            new Piece(
              this.playerIsWhite ? "white" : "black",
              this.playerIsWhite
                ? this.reverseArray(whitePawnIds)[j]
                : this.reverseArray(blackPawnIds)[j],
              "pawn",
            ),
          );
        } else if (i == RANKS.length - 2) {
          board[i][this.playerIsWhite ? j : 7 - j].setPiece(
            new Piece(
              this.playerIsWhite ? "black" : "white",
              this.playerIsWhite
                ? this.reverseArray(whitePawnIds)[j]
                : this.reverseArray(blackPawnIds)[j],
              "pawn",
            ),
          );

          board[i + 1][this.playerIsWhite ? j : 7 - j].setPiece(
            new Piece(
              this.playerIsWhite ? "black" : "white",
              this.playerIsWhite
                ? this.reverseArray(whitePieceIds)[j]
                : this.reverseArray(blackPieceIds)[j],
              backrank[j],
            ),
          );
        }
      }
    }

    return board;
  }
}

export default Board;
