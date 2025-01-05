import React from "react";
import { useDrag } from "react-dnd";
import PieceType from "./constants/PieceType";

interface IPiece {
  isWhite: boolean;
  whitePerspective: boolean;
  whiteTurnToMove: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string;
  pieceId: string;
  coordinates: { [key: string]: number };
}

const Piece: React.FC<IPiece> = ({
  isWhite,
  whitePerspective,
  whiteTurnToMove,
  pieceImgUrls,
  pieceName,
  pieceId,
  coordinates,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    item: {
      pieceId,
      pieceName,
      coordinates,
      whiteTurnToMove,
    },
    type: PieceType.CHESSPIECE,
    collect: (monitor) => {
      console.log(monitor.isDragging());
      return {
        isDragging: !!monitor.isDragging(),
        data: monitor.getItem(),
      };
    },
  }));

  console.log("is dragging?", isDragging);

  const colorIndex = isWhite ? 0 : 1;
  return pieceImgUrls ? (
    <img
      className="piece"
      src={pieceImgUrls[colorIndex]}
      alt={`${whitePerspective ? "White" : "Black"} ${pieceName}`}
      tabIndex={0}
      role="button"
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />
  ) : (
    ""
  );
};

export default Piece;
