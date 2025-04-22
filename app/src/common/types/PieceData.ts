import { CoordType } from "./CoordType";


export interface PieceData {
  pieceId: string;
  pieceName: string;
  pieceColor: string;
  fromCoordinates: CoordType;
  whiteTurnToMove: boolean;
  fromNotation: string;
}
