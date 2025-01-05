import React from "react";
import Square from "../Square/Square";
import { Square as SquareModel } from "../../models/Square";
import PieceMap from "../../data/piece-map";
import { Board as Game } from "../../models/Board";

interface BoardProps {
  board: SquareModel[][];
  game: Game;
  whitePerspective: boolean;
  whiteTurnToMove: boolean;
  handlePieceDrop: () => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  whitePerspective,
  handlePieceDrop,
  whiteTurnToMove,
  game,
}) => {
  return (
    <div className="board__container flex centered">
      <div className="board__interface">
        <img src="/assets/images/board/brown.png" className="board" />
        <div
          className={`square__container ${whitePerspective ? "flipped" : ""}`}
        >
          {board.map((row, outerIndex) => {
            return row.map((col, innerIndex) => {
              const isPieceOnThisSquare = Boolean(col.pieceOnThisSquare);
              const splitNotation = col.notation.split("");
              const file = splitNotation[0];
              const rank = splitNotation[1];

              // File notations
              const showFileNotationFromWhitePerspective =
                outerIndex === 0 && whitePerspective;

              const showFileNotationFromBlackPerspective =
                outerIndex === 7 && !whitePerspective;

              // Rank notations
              const showRankNotationFromWhitePerspective =
                innerIndex === 0 && whitePerspective;

              const showRankNotationFromBlackPerspective =
                innerIndex === 7 && !whitePerspective;

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
                  whiteTurnToMove={whiteTurnToMove}
                  isPieceOnThisSquare={isPieceOnThisSquare}
                  game={game}
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
                  whitePerspective={whitePerspective}
                  isWhite={
                    isPieceOnThisSquare && col.getPiece()?.color === "white"
                  }
                  notation={col.notation}
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
