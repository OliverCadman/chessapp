import Piece from "./Piece";

interface ICoords {
  [key: string]: number;
}

export class Square {
  coordinates: ICoords;
  notation: string;
  pieceOnThisSquare: Piece | null;

  constructor(
    coordinates: ICoords,
    notation: string,
    pieceOnThisSquare: Piece | null,
  ) {
    this.coordinates = coordinates;
    this.notation = notation;
    this.pieceOnThisSquare = pieceOnThisSquare;
  }

  setPiece(departedSquare: Square | null, piece: Piece) {
    if (this.pieceOnThisSquare) {
      return;
    } else this.pieceOnThisSquare = piece;

    if (
      departedSquare?.pieceOnThisSquare &&
      departedSquare.pieceOnThisSquare === piece
    )
      departedSquare.pieceOnThisSquare = null;
  }

  getPiece() {
    return this.pieceOnThisSquare;
  }
}

export default Square;
