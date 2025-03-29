import Square from "./Square";
import { CoordType } from "../common/types/CoordType";
import { RANK_LENGTH, FILE_LENGTH } from "./contants";

class BoardManager {

    makeMove(
        board: Square[][],
        toCoordinates: CoordType,
        fromCoordinates: CoordType
      ) {
    
        if (!board) return;
    
        let piece;
        let departedSquare;
    
        const { x: toX, y: toY } = toCoordinates;
    
        const { x: fromX, y: fromY } = fromCoordinates;
    
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
              if (!setPieceAttempt) return [board, false];
            }
          }
        }
    
        return [board, true]
      }

}

export default BoardManager