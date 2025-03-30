import React from "react";
import { useDrag } from "react-dnd";
import PieceType from "./constants/PieceType";
import { PieceData } from "../../common/types/PieceData";


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
  notation
}) => {

  const [{ isDragging }, dragRef] = useDrag(() => {
    const data: PieceData = {
      pieceId,
      pieceName,
      coordinates,
      pieceColor,
      whiteTurnToMove,
      notation
    };
    return {
      item: data,
      type: PieceType.CHESSPIECE,
      collect: (monitor) => {
        return {
          isDragging: !!monitor.isDragging(),
          data: monitor.getItem(),
        };
      }
    };
  }, [pieceId]);

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
