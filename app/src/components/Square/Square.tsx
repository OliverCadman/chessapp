import React from "react";
import Piece from "../Piece/Piece";
import PieceType from "../Piece/constants/PieceType";
import { CoordType } from "../../common/types/CoordType";
import { PieceData } from "../../common/types/PieceData";
import { useDrop, DropTargetMonitor } from "react-dnd";
import SquareOverlay from "../SquareOverlay/SquareOverlay";

interface SquareProps {
  isPieceOnThisSquare: boolean;
  whitePerspective: boolean;
  isWhite: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string | null;
  pieceId: string | null;
  pieceColor: string | null;
  whiteTurnToMove: boolean;
  coordinates: { [key: string]: number };
  file?: string;
  rank?: string;
  handlePieceDrop: (
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    color: string,
    whiteTurnToMove: boolean,
  ) => void;
}

const Square: React.FC<SquareProps> = ({
  isPieceOnThisSquare,
  whitePerspective,
  isWhite,
  pieceImgUrls,
  pieceName,
  pieceId,
  pieceColor,
  coordinates,
  handlePieceDrop,
  whiteTurnToMove,
  file,
  rank,
}) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: PieceType.CHESSPIECE,

    collect: (monitor: DropTargetMonitor) => {
      return {
        data: monitor.getItem(),
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      };
    },
    drop: (item: PieceData) => {
      if (!item) return;

      handlePieceDrop(
        coordinates,
        item.coordinates,
        item.pieceColor,
        whiteTurnToMove
      );
    }
  }), [whiteTurnToMove]);

  return (
    <div
      className={`square flex centered ${whitePerspective ? "flipped" : ""}`}
      ref={drop}
      draggable="false"
    >
      <p className="notation file" draggable="false">
        {file}
      </p>
      <p className="notation rank">{rank}</p>
      {!!isPieceOnThisSquare && !!pieceName && !!pieceId && !!pieceColor && (
        <Piece
          whitePerspective={whitePerspective}
          pieceImgUrls={pieceImgUrls}
          pieceName={pieceName}
          isWhite={isWhite}
          coordinates={coordinates}
          pieceId={pieceId}
          pieceColor={pieceColor}
          whiteTurnToMove={whiteTurnToMove}
        />
      )}
      {isOver && !isPieceOnThisSquare && <SquareOverlay />}
    </div>
  );
};

export default Square;
