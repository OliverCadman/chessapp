import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { PieceData } from "../../common/types/PieceData";
import useArenaState from "../../store/arena";


interface IPiece {
  isWhite: boolean;
  whitePerspective: boolean;
  whiteTurnToMove: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string;
  pieceId: string;
  pieceColor: string;
  coordinates: { [key: string]: number };
  notation: string;
  inCheck: boolean;
}

const Piece: React.FC<IPiece> = ({
  isWhite,
  whitePerspective,
  pieceImgUrls,
  pieceName,
  pieceId,
  pieceColor,
  coordinates,
  whiteTurnToMove,
  notation,
  inCheck
}) => {

  const activePiece = useArenaState((state) => state.activePiece);

  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: pieceId,
    data: {
      isWhite,
      pieceName,
      pieceId,
      pieceColor,
      fromCoordinates: coordinates,
      fromNotation: notation,
      whiteTurnToMove
    } as PieceData
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
   } : undefined;

  const colorIndex = isWhite ? 0 : 1;

  return pieceImgUrls ? (
    <div className={`piece__wrapper ${inCheck ? "danger" : ""}`}>
      <img
      className={`piece ${activePiece?.coordinates === coordinates ? "active" : ""}`}
      style={style}
      src={pieceImgUrls[colorIndex]}
      alt={`${whitePerspective ? "White" : "Black"} ${pieceName}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    />
    </div>
  ) : (
    ""
  );
};

export default Piece;
