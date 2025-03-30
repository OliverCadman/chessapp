import React from "react";
import Piece from "../Piece/Piece";
import PieceType from "../Piece/constants/PieceType";
import { CoordType } from "../../common/types/CoordType";
import { PieceData } from "../../common/types/PieceData";
import { useDrop, DropTargetMonitor } from "react-dnd";
import SquareOverlay from "../SquareOverlay/SquareOverlay";
import type { IMoveData } from "../../store/store.types";

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
  notation: string;
  moveData: IMoveData | null;
  handlePieceDrop: (
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    color: string,
    whiteTurnToMove: boolean,
    fromNotation: string,
    toNotation: string
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
  notation,
  moveData
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
        whiteTurnToMove,
        item.notation, // Notation of departed square
        notation // Notation of target square
      );
    }
  }), [whiteTurnToMove]);

  const shouldBeHighlighted = () => {
   return moveData ? moveData.from === notation || moveData.to === notation : false
  }

  return (
    <div
      className={`square flex centered ${whitePerspective ? "flipped" : ""} ${shouldBeHighlighted() ? "highlighted": ""}`}
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
          notation={notation}
        />
      )}
      {isOver && !isPieceOnThisSquare && <SquareOverlay />}
    </div>
  );
};

export default Square;
