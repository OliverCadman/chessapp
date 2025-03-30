import React from "react";
import Square from "../Square/Square";
import { Square as SquareModel } from "../../models/Square";
import { CoordType } from "../../common/types/CoordType";
import PieceMap from "../../data/piece-map";

interface BoardProps {
  board: SquareModel[][];
  whitePerspective: boolean;
  whiteTurnToMove: boolean;
  handlePieceDrop: (
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    color: string,
    whiteTurnToMove: boolean,
    fromNotation: string,
    toNotation: string
  ) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  whitePerspective,
  handlePieceDrop,
  whiteTurnToMove,
}) => {
  return (
    <div className="board__container flex centered">
      <div className="board__interface">
        <img src="/assets/images/board/brown.png" className="board" />
        <div
          className={`square__container ${!whitePerspective ? "flipped" : ""}`}
        >
          {board.map((row, outerIndex) => {
            return row.map((col, innerIndex) => {
              const isPieceOnThisSquare = Boolean(col.pieceOnThisSquare);
              const splitNotation = col.notation.split("");
              const file = splitNotation[0];
              const rank = splitNotation[1];

              // File notations
              const showFileNotationFromWhitePerspective =
                outerIndex === 7 && whitePerspective;

              const showFileNotationFromBlackPerspective =
                outerIndex === 0 && !whitePerspective;

              // Rank notations
              const showRankNotationFromWhitePerspective =
                innerIndex === 7 && whitePerspective;

              const showRankNotationFromBlackPerspective =
                innerIndex === 0 && !whitePerspective;

              return (
                <Square
                  file={
                    showFileNotationFromWhitePerspective ||
                    showFileNotationFromBlackPerspective
                      ? file
                      : ""
                  }
                  rank={
                    showRankNotationFromWhitePerspective ||
                    showRankNotationFromBlackPerspective
                      ? rank
                      : ""
                  }
                  notation={col.notation}
                  whiteTurnToMove={whiteTurnToMove}
                  isPieceOnThisSquare={isPieceOnThisSquare}
                  handlePieceDrop={handlePieceDrop}
                  pieceImgUrls={
                    col.pieceOnThisSquare &&
                    PieceMap[col.pieceOnThisSquare.pieceName]
                  }
                  pieceName={
                    col.pieceOnThisSquare && col.pieceOnThisSquare.pieceName
                  }
                  pieceId={
                    col.pieceOnThisSquare && col.pieceOnThisSquare.pieceId
                  }
                  pieceColor={
                    col.pieceOnThisSquare && col.pieceOnThisSquare.color
                  }
                  whitePerspective={whitePerspective}
                  isWhite={
                    isPieceOnThisSquare && col.getPiece()?.color === "white"
                  }
                  coordinates={col.coordinates}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
