import { PieceColors } from "../constants/PieceColors";
import Piece from "./Piece";

interface ICoords {
  [key: string]: number;
}

export class Square {
  coordinates: ICoords;
  notation: string | null;
  pieceOnThisSquare: Piece | null;

  constructor(
    coordinates: ICoords,
    notation: string | null,
    pieceOnThisSquare: Piece | null,
  ) {
    this.coordinates = coordinates;
    this.notation = notation;
    this.pieceOnThisSquare = pieceOnThisSquare;
  }

  isOpponentPiece(pieceOne: Piece, pieceTwo: Piece) {
    return pieceOne.color !== pieceTwo.color;
  }

  removePiece() {
    this.pieceOnThisSquare = null;
  }

  placePiece(piece: Piece) {
    this.pieceOnThisSquare = piece;
  }

  pawnReachedPromotionSquare() {
    if (!this.notation) return;
    
    const rankNumber = this.notation.split("")[1]
    return (
     (
      this.pieceOnThisSquare?.color === PieceColors.WHITE
      && rankNumber === "8") ||
      (
        this.pieceOnThisSquare?.color === PieceColors.BLACK
        && rankNumber === "1"
      )
    )
  }

  setPiece(departedSquare: Square | null, piece: Piece, isPromotion: boolean) {
    if (this.pieceOnThisSquare) {
      if (this.isOpponentPiece(piece, this.pieceOnThisSquare)) {
        this.removePiece()
        this.placePiece(piece)
      } else return false;
    } else this.pieceOnThisSquare = piece;

    if (
      departedSquare?.pieceOnThisSquare &&
      (departedSquare.pieceOnThisSquare === piece|| isPromotion)
    ) {
      departedSquare.pieceOnThisSquare = null;
    }
    return true;
  }

  getPiece() {
    return this.pieceOnThisSquare;
  }
}

export default Square;
