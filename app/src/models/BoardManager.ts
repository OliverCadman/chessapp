import Square from "./Square";
import { CoordType } from "../common/types/CoordType";
import { 
  RANK_LENGTH, 
  FILE_LENGTH, 
  CASTLE_DESTINATION_SQUARES,
  MOVE_FLAGS,
  backrank,
  PROMOTION_PIECES,
  coordToFile,
  coordToRank
} from "./constants";

import { Chess } from "chess.js";
import Piece from "./Piece";
import { PieceColors } from "../constants/PieceColors";


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

  private submitPromotion(from: string, to: string, promotion: string) {
    return this.chess.move({from, to, promotion})
  }

  private isInCheck() {
    return this.chess.inCheck()
  }

  updateBoard(
    board: Square[][], 
    fromX: number, 
    fromY: number, 
    toX: number, 
    toY: number,
    isPromotion: boolean,
    promotionPieceName: string | null,
    promotionPieceID: string | null,
    promotionColor: string | null
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
      
      let setPieceAttempt;
      for (let i = 0; i < FILE_LENGTH; i++) {
        for (let j = 0; j < RANK_LENGTH; j++) {
          const boardCoords = board[i][j].coordinates; 
          if (piece && boardCoords.x === toX && boardCoords.y === toY) {
            if (isPromotion && promotionColor && promotionPieceID && promotionPieceName) {
              console.log(departedSquare)
              setPieceAttempt = board[i][j].setPiece(
                departedSquare || null,
                new Piece(promotionColor, promotionPieceID, promotionPieceName),
                true
              )
            } else {
              setPieceAttempt = board[i][j].setPiece(
                departedSquare || null,
                piece,
                false
              );
            }

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

  computeAttackedEPPiecePosition(san: string, pieceColor: string) {
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
    const rank = parseInt(splitNotation[1]);
    let tmpRank;

    console.log(pieceColor, PieceColors.WHITE)
    if (pieceColor === PieceColors.WHITE) {
      console.log("piece that en passanted is white")
      tmpRank = rank - 1
    } else tmpRank = rank + 1

    return `${file}${tmpRank}`
  }

  
  performEnPassant(board: Square[][], moveSAN: string, pieceColor: string) {

    const capturedSquareNotation = this.computeAttackedEPPiecePosition(moveSAN, pieceColor)
    const capturedSquare =  this.findSquareByNotation(board, capturedSquareNotation);

    console.log(capturedSquareNotation, capturedSquare)

    if (!capturedSquare) return

    capturedSquare.removePiece()
  }

  isPromotion(y: number, pieceId: string) {
    const pieceColor = this.splitString(pieceId, "")[0]

    return (
      y === 7 && pieceColor === "w" ||
      y === 0 && pieceColor === "b"
    )
  }

  createNewPieceID(board: Square[][], color: string, pieceNotation: string) {
    const pieceArr = this.findPiecesByColorAndID(board, color, pieceNotation);
    return `${this.splitString(color, "")[0]}${pieceNotation}${pieceArr.length + 1}`
  }

  createPromotionSquareArray(
    pieceId: string,
    promotionSquareCoords: {[key: string]: number},
    color: string
  ) {

    if (!this.isPromotion(promotionSquareCoords.y, pieceId)) return;
    
    const {x, y} = promotionSquareCoords; 
    let tmpX;

    if (color === PieceColors.WHITE) {
      // White's perspective
      if (x > 0 && x <= 4) {
         tmpX = x;
       } else if (x > 4) {
         tmpX = 4;
       } else {
         tmpX = 0;
       } 
    } else {
      // Black's perspective
      if (x < 7 && x >= 3) {
        tmpX = x;
      } else if (x < 3) {
        tmpX = 3
      } else {
        tmpX = 7
      }
    }
      
    return PROMOTION_PIECES
    .map((piece, idx) => {
      if (color === PieceColors.BLACK) {
        /**
         * We want to present our
         * selection of promotion pieces from left to right.
         * 
         * From white's perspective, it is enough to use the add the index
         * of the map to the x-position of where the promoting pawn landed,
         * since the x coords from the white perspective move from left to right.
         * 
         * From black's perspective, this won't work since if black's promoting
         * pawn lands on, say, x coord 7 (the far left of the board), the idx would
         * end up incrementing from there (...8, 9, 10). Of course,
         * this is undesirable. So, invert the index if black is the player promoting.
         */
        idx = -idx
      }

      return new Square(
        {
          x: idx + tmpX,
          y: y
        },
        null,
        new Piece(
          color,
          null,
          piece.pieceName
        )
      )
    })
  }

  findPiecesByColorAndID(board: Square[][], color: string, pieceNotation: string) {
    const pieceArr = [];

    for (let i = 0; i < FILE_LENGTH; i++) {
      for (let j = 0; j < RANK_LENGTH; j++) {
        if (board[i][j].pieceOnThisSquare) {
          const piece = board[i][j].pieceOnThisSquare
          if (piece?.pieceId && this.splitString(piece.pieceId, "")[1] === pieceNotation && piece.color === color) {
            pieceArr.push(piece.pieceId)
          }
        }
      }
    }
    return pieceArr
  }

  makeMove(
      board: Square[][],
      color: string,
      pieceId: string,
      toCoordinates: CoordType,
      fromCoordinates: CoordType,
      fromNotation: string,
      toNotation: string,
      promotionSelection: string | null
    ) {
  
      if (!board) return;

      const { x: toX, y: toY } = toCoordinates;
      const { x: fromX, y: fromY } = fromCoordinates;
    
      try {

        if (promotionSelection) {
          /**
           * ChessJS does not accept promotion
           * moves unless the promotion piece is added 
           * to the 'move' method, which makes sense.
           * 
           * Need to add alternative to 'submitMove' method
           * to allow for promoting pawns.
           * 
           */

  
          let cleansedPromotionPiece = promotionSelection === "n" ? "k" : promotionSelection;

          const move = this.submitPromotion(fromNotation, toNotation, promotionSelection);
          const promotionColor = pieceId.split("")[0] === "w" ? "white" : "black"
          const newPieceID = this.createNewPieceID(board, promotionColor, promotionSelection)
          const backrankCleansed = backrank.filter(x => x !== "king")
          const newPiece = backrankCleansed[
            backrankCleansed.map(x => x[0]).indexOf(cleansedPromotionPiece)
          ]

          return {
            board: this.updateBoard(board, fromX, fromY, toX, toY, true, newPiece, newPieceID, promotionColor),
            moveData: {
              from: move.from,
              to: move.to,
              inCheck: this.isInCheck(),
              pieceColor: move.color
            },
            validMove: true
          }
        }
 
        const move = this.submitMove(fromNotation, toNotation)
       
        if (
          [MOVE_FLAGS.KINGSIDE_CASTLE, MOVE_FLAGS.QUEENSIDE_CASTLE]
          .includes(move.flags)
        ) {
          const newBoard = this.performCastle(board, move.to)
          return {
            board: this.updateBoard(newBoard, fromX, fromY, toX, toY, false, null, null, null),
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
          this.performEnPassant(board, move.san, color);
        }


        return {
          board: this.updateBoard(board, fromX, fromY, toX, toY, false, null, null, null),
          moveData: {
            from: move.from,
            to: move.to,
            inCheck: this.isInCheck(),
            pieceColor: move.color
          },
          validMove: true
        }

      } catch (err) {
        console.log(err)
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