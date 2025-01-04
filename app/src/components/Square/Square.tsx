import React from "react";
import Piece from "../Piece/Piece";

interface SquareProps {
  isPieceOnThisSquare: boolean;
  whitePerspective: boolean;
  isWhite: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string | null;
  pieceId: string | null;
  notation: string;
  coordinates: { [key: string]: number };
  handlePieceClick: (
    coordinates: { [key: string]: number },
    pieceName: string,
    pieceId: string,
  ) => void;
}

const Square: React.FC<SquareProps> = ({
  isPieceOnThisSquare,
  whitePerspective,
  isWhite,
  pieceImgUrls,
  pieceName,
  pieceId,
  notation,
  coordinates,
  handlePieceClick,
}) => {
  return (
    <div
      className={`square flex centered ${whitePerspective ? "flipped" : ""}`}
    >
      <p className="notation">{notation}</p>
      {!!isPieceOnThisSquare && !!pieceName && !!pieceId && (
        <Piece
          whitePerspective={whitePerspective}
          pieceImgUrls={pieceImgUrls}
          pieceName={pieceName}
          isWhite={isWhite}
          handlePieceClick={handlePieceClick}
          coordinates={coordinates}
          pieceId={pieceId}
        />
      )}
    </div>
  );
};

export default Square;
