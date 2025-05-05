class Piece {
  color: string;
  pieceId: string | null;
  pieceName: string;

  constructor(color: string, pieceId: string | null, pieceName: string) {
    this.color = color;
    this.pieceId = pieceId;
    this.pieceName = pieceName;
  }
}

export default Piece;
