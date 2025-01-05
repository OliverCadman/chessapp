import React from "react";
import Piece from "../Piece/Piece";
import PieceType from "../Piece/constants/PieceType";
import { useDrop } from "react-dnd";
import SquareOverlay from "../SquareOverlay/SquareOverlay";
import { Board as Game } from "../../models/Board";

interface SquareProps {
  isPieceOnThisSquare: boolean;
  game: Game;
  whitePerspective: boolean;
  isWhite: boolean;
  pieceImgUrls: string[] | null;
  pieceName: string | null;
  pieceId: string | null;
  notation: string;
  whiteTurnToMove: boolean;
  coordinates: { [key: string]: number };
  file?: string;
  rank?: string;
  handlePieceDrop: () => void;
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
  handlePieceDrop,
  whiteTurnToMove,
  file,
  rank,
  game,
}) => {
  const [{ isOver, data, canDrop }, drop] = useDrop(() => ({
    accept: PieceType.CHESSPIECE,

    collect: (monitor) => {
      if (monitor.getItem()) {
        const item = monitor.getItem();
        console.log(item);
      }
      return {
        canDrop: true,
        data: monitor.getItem(),
        isOver: !!monitor.isOver(),
      };
    },
    drop: () => {
      handlePieceDrop();
    },
  }));

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
      {!!isPieceOnThisSquare && !!pieceName && !!pieceId && (
        <Piece
          whitePerspective={whitePerspective}
          whiteTurnToMove={whiteTurnToMove}
          pieceImgUrls={pieceImgUrls}
          pieceName={pieceName}
          isWhite={isWhite}
          coordinates={coordinates}
          pieceId={pieceId}
        />
      )}
      {isOver && !isPieceOnThisSquare && <SquareOverlay />}
    </div>
  );
};

export default Square;
