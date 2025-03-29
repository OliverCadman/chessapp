import { CoordType } from "./CoordType";

export interface PieceData {
  pieceId: string;
  pieceName: string;
  pieceColor: string;
  coordinates: CoordType;
  whiteTurnToMove: boolean;
}
