import Square from "./Square";
import { CoordType } from "../common/types/CoordType";
import { RANK_LENGTH, FILE_LENGTH } from "./constants";

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
        console.log(move)
          
        const { x: toX, y: toY } = toCoordinates;
        const { x: fromX, y: fromY } = fromCoordinates;

        return {
          board: this.updateBoard(board, fromX, fromY, toX, toY),
          moveData: {
            from: move.from,
            to: move.to,
            inCheck: this.isInCheck(),
            colorOfMovedPiece: move.color
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

  reverseBoard(
    board: Square[][]
  ) {
    
    return board.slice().reverse().map(row => row.slice().reverse())
  }

}

export default BoardManager