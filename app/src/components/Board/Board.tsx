import React, {useEffect, useState, useRef} from "react";
import type { SetStateAction } from "react";
import Square from "../Square/Square";
import { Square as SquareModel } from "../../models/Square";
import type { IMoveData } from "../../store/store.types";
import type { IPromotionData } from "../../store/store.types";
import PieceMap from "../../data/piece-map";
import PiecePromotionBanner from "../PiecePromotionBanner/PiecePromotionBanner";

interface BoardProps {
  board: SquareModel[][];
  whitePerspective: boolean;
  whiteTurnToMove: boolean;
  moveData: IMoveData | null;
  promotionData: IPromotionData | null;
  onRefReady: React.Dispatch<SetStateAction<HTMLDivElement | undefined>>
}

const Board: React.FC<BoardProps> = ({
  board,
  whitePerspective,
  whiteTurnToMove,
  moveData,
  promotionData,
  onRefReady
}) => {

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boardRef.current) return;

    onRefReady(boardRef.current);
  }, [boardRef])

  
  return (
    <div className="board__container flex centered">
      <div className="board__interface">
        <img src="/assets/images/board/brown.png" className="board" />
        <div
          className={`square__container`}
          ref={boardRef}
        >
          {promotionData && <PiecePromotionBanner color="white" bannerRect={promotionData.bannerRect} />}
          {board.map((row, outerIndex) => {
            return row.map((col, innerIndex) => {
              const isPieceOnThisSquare = Boolean(col.pieceOnThisSquare);
              const notation = col.notation;
              const splitNotation = notation.split("");
              const file = splitNotation[0];
              const rank = splitNotation[1];
          

              // File notations
              const showFileNotation =
                outerIndex === 7
              
              const showRankNotation =
                innerIndex === 7

              const fileNotationColorClass = 
                showFileNotation ? (
                  innerIndex % 2 === 0 ? "beige-text" : "brown-text"
                ) : ""

              const rankNotationColorClass = 
                showRankNotation ? (
                  outerIndex % 2 === 0 ? "beige-text" : "brown-text"
                ) : ""

              return (
        
                  <Square
                    key={notation}
                    fileNotationColorClass={fileNotationColorClass}
                    rankNotationColorClass={rankNotationColorClass}
                    file={
                      showFileNotation ? file : ""
                    }
                    rank={
                      showRankNotation ? rank : ""
                    }
                    notation={col.notation}
                    whiteTurnToMove={whiteTurnToMove}
                    isPieceOnThisSquare={isPieceOnThisSquare}
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
                    moveData={moveData}
            
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
