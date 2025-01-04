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

  setPiece(piece: Piece) {
    this.pieceOnThisSquare = piece;
  }

  getPiece() {
    return this.pieceOnThisSquare;
  }
}

export default Square;
