class Piece {
  color: string;
  pieceId: string;
  pieceName: string;

  constructor(color: string, pieceId: string, pieceName: string) {
    this.color = color;
    this.pieceId = pieceId;
    this.pieceName = pieceName;
  }
}

export default Piece;
