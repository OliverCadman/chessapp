import Square from "./Square";
import { CoordType } from "../common/types/CoordType";
import { 
  RANK_LENGTH, 
  FILE_LENGTH, 
  CASTLE_DESTINATION_SQUARES,
  MOVE_FLAGS
} from "./constants";

import { Chess } from "chess.js";



class BoardManager {

  chess: Chess
  xToFile: {[key: string]: string}
  yToRank: {[key: number]: number}

  constructor () {
    this.chess = new Chess();
    this.xToFile = {
      0: "a",
      1: "b", 
      2: "c", 
      3: "d", 
      4: "e",
      5: "f",
      6: "g",
      7: "h"
    }
    this.yToRank = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
      6: 7,
      7: 8
    }
  }

  private submitMove(from: string, to: string) {
    return this.chess.move({from, to})
  }

  private isInCheck() {
    return this.chess.inCheck()
  }

  updateBoard(
    board: Square[][], 
    fromX: number, 
    fromY: number, 
    toX: number, 
    toY: number
  ) {

    let piece;
    let departedSquare;
    
     for (let i = 0; i < FILE_LENGTH; i++) {
        for (let j = 0; j < RANK_LENGTH; j++) {
          const boardCoords = board[i][j].coordinates;
          if (boardCoords.x === fromX && boardCoords.y === fromY) {
            departedSquare = board[i][j];
            piece = departedSquare.getPiece();
          }
        }
      }
  
      for (let i = 0; i < FILE_LENGTH; i++) {
        for (let j = 0; j < RANK_LENGTH; j++) {
          const boardCoords = board[i][j].coordinates; 
          if (piece && boardCoords.x === toX && boardCoords.y === toY) {
            const setPieceAttempt = board[i][j].setPiece(
              departedSquare || null,
              piece,
            );
            if (!setPieceAttempt) return board; // Square is occupied by an opponent's own piece.
          }
        }
      }
      return board // All good!
  }

  performCastle(
    board: Square[][],
    toNotation: string,
  ) {

    console.log("castling...")

    let fromX,
        fromY,
        toX,
        toY

    switch (toNotation) {
      case CASTLE_DESTINATION_SQUARES.G1: {
        fromX = 7;
        fromY = 0;
        toX = 5;
        toY = 0;
      };
      break;
      case CASTLE_DESTINATION_SQUARES.C1: {
        fromX = 0;
        fromY = 0;
        toX = 3;
        toY = 0;
      };
      break;
      case CASTLE_DESTINATION_SQUARES.G8: {
        fromX = 7;
        fromY = 7;
        toX = 5;
        toY = 7;
      }
      break;
      case CASTLE_DESTINATION_SQUARES.C8: {
        fromX = 0;
        fromY = 7;
        toX = 3;
        toY = 7;
      }
      break;
      default:
        break;
    }
    if ( // Truthiness won't work since some values are zero.
      typeof fromX === "number" &&
      typeof fromY === "number" &&
      typeof toX === "number" &&
      typeof toY === "number"
    ) {
      return this.updateBoard(board, fromX, fromY, toX, toY)
    } else return board;

  }

  splitString(string: string, delimiter: string) {
    return string.split(delimiter)
  }

  extractTakenSquare(san: string) {
    return this.splitString(san, "x")[1]
  }

  findSquareByNotation(board: Square[][], notation: string) {
    return board
    .reduce((acc, curr) => acc.concat(curr), [])
    .find((s) => s.notation === notation);
  }

  computeAttackedEPPiecePosition(san: string) {
    /*
      En passant can only occur when both opponent's
      pawns are on the 5th rank. 

      When a player takes a piece via en passant,
      the SAN for this move is e.g. 'exf6'.

      Therefore, we need to extract 'f4' and convert it to 
      'f5', to then use to grab the coords of this piece.
    */
    const squareThatOpponentHasAttacked = this.extractTakenSquare(san);
    const splitNotation = this.splitString(squareThatOpponentHasAttacked, "")

    const file = splitNotation[0]
    const rank = parseInt(splitNotation[1])

    return `${file}${rank - 1}`
  }

  
  performEnPassant(board: Square[][], moveSAN: string) {

    const capturedSquareNotation = this.computeAttackedEPPiecePosition(moveSAN)
    const capturedSquare =  this.findSquareByNotation(board, capturedSquareNotation);

    if (!capturedSquare) return

    capturedSquare.removePiece()
  }

  makeMove(
      board: Square[][],
      toCoordinates: CoordType,
      fromCoordinates: CoordType,
      fromNotation: string,
      toNotation: string
    ) {
  
      if (!board) return;
    
      try {
        
        const move = this.submitMove(fromNotation, toNotation)

        const { x: toX, y: toY } = toCoordinates;
        const { x: fromX, y: fromY } = fromCoordinates;
       
        if (
          [MOVE_FLAGS.KINGSIDE_CASTLE, MOVE_FLAGS.QUEENSIDE_CASTLE]
          .includes(move.flags)
        ) {
          const newBoard = this.performCastle(board, move.to)
          return {
            board: this.updateBoard(newBoard, fromX, fromY, toX, toY),
            moveData: {
            from: move.from,
            to: move.to,
            inCheck: this.isInCheck(),
            pieceColor: move.color
          },
          validMove: true
          }
        }

        if (move.flags === MOVE_FLAGS.EN_PASSANT) {
          this.performEnPassant(board, move.san);
        }

        return {
          board: this.updateBoard(board, fromX, fromY, toX, toY),
          moveData: {
            from: move.from,
            to: move.to,
            inCheck: this.isInCheck(),
            pieceColor: move.color
          },
          validMove: true
        }

      } catch (err) {
        return {
          board,
          moveData: null,
          validMove: false
        }; // ChessJS returned an InvalidMove exception.
      }
    }

  rotateBoard(
    board: Square[][]
  ) {
    return board.slice().reverse().map(row => row.slice().reverse())
  }

}

export default BoardManager