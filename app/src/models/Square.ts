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

  isOpponentPiece(pieceOne: Piece, pieceTwo: Piece) {
    return pieceOne.color !== pieceTwo.color;
  }

  removePiece() {
    this.pieceOnThisSquare = null;
  }

  placePiece(piece: Piece) {
    this.pieceOnThisSquare = piece;
  }

  setPiece(departedSquare: Square | null, piece: Piece) {
    if (this.pieceOnThisSquare) {
      if (this.isOpponentPiece(piece, this.pieceOnThisSquare)) {
        this.removePiece()
        this.placePiece(piece)
      } else return false;
    } else this.pieceOnThisSquare = piece;

    if (
      departedSquare?.pieceOnThisSquare &&
      departedSquare.pieceOnThisSquare === piece
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
