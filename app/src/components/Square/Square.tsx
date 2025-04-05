import React from "react";
import Piece from "../Piece/Piece";
import PieceType from "../Piece/constants/PieceType";
import { CoordType } from "../../common/types/CoordType";
import { PieceData } from "../../common/types/PieceData";


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
  fileNotationColorClass: string | null;
  rankNotationColorClass: string | null;
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
  moveData,
  fileNotationColorClass,
  rankNotationColorClass
}) => {

  const shouldBeHighlighted = () => {
   return moveData ? moveData.from === notation || moveData.to === notation : false
  }

  const inCheck = () =>  {
    return moveData && pieceId && pieceColor ? (
      pieceId.includes("k") && pieceColor[0] !== moveData.colorOfMovedPiece && moveData.inCheck
    ) : false
  }

  return (
    <div
      className={`
        square flex centered ${whitePerspective ? "flipped" : ""} 
        ${shouldBeHighlighted() ? "highlighted": ""}`}

      draggable="false"
    >
      {
        file ? 
          <p className={`notation file ${fileNotationColorClass}`} draggable="false">
            {file}
          </p> : ""
      } 
      {
        rank ? 
          <p className={`notation rank ${rankNotationColorClass}`}>
            {rank}
          </p> : ""     
      }
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
          inCheck={inCheck()}

        />
      )}
      {/* {isOver && !isPieceOnThisSquare && <SquareOverlay />} */}
    </div>
  );
};

export default Square;
