import React from "react";

interface IPiece {
  isWhite: boolean;
  whitePerspective: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string;
  pieceId: string;
  coordinates: { [key: string]: number };
  handlePieceClick: (
    coordinates: { [key: string]: number },
    pieceName: string,
    pieceId: string,
  ) => void;
}

const Piece: React.FC<IPiece> = ({
  isWhite,
  whitePerspective,
  pieceImgUrls,
  pieceName,
  pieceId,
  handlePieceClick,
  coordinates,
}) => {
  const colorIndex = isWhite ? 0 : 1;
  return pieceImgUrls ? (
    <img
      className="piece"
      src={pieceImgUrls[colorIndex]}
      alt={`${whitePerspective ? "White" : "Black"} ${pieceName}`}
      tabIndex={0}
      role="button"
      onClick={() => handlePieceClick(coordinates, pieceName, pieceId)}
    />
  ) : (
    ""
  );
};

export default Piece;
