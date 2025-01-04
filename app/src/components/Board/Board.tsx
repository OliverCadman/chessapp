import React from "react";
import Square from "../Square/Square";
import { Square as SquareModel } from "../../models/Square";
import PieceMap from "../../data/piece-map";

interface BoardProps {
  board: SquareModel[][];
  whitePerspective: boolean;
  handlePieceClick: () => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  whitePerspective,
  handlePieceClick,
}) => {
  console.log(board);
  return (
    <div className="board__container flex centered">
      <div className="board__interface">
        <img src="/assets/images/board/brown.png" className="board" />
        <div
          className={`square__container ${whitePerspective ? "flipped" : ""}`}
        >
          {board.map((row, idx) => {
            return row.map((col, idx) => {
              const isPieceOnThisSquare = Boolean(col.pieceOnThisSquare);
              return (
                <Square
                  isPieceOnThisSquare={isPieceOnThisSquare}
                  handlePieceClick={handlePieceClick}
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
