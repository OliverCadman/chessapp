import React, {useEffect, useRef, useState} from "react";
import Square from "../Square/Square";
import { Square as SquareModel } from "../../models/Square";
import { CoordType } from "../../common/types/CoordType";
import type { IMoveData } from "../../store/store.types";
import PieceMap from "../../data/piece-map";
import PiecePromotionBanner from "../PiecePromotionBanner/PiecePromotionBanner";

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
  moveData: IMoveData | null
}

const Board: React.FC<BoardProps> = ({
  board,
  whitePerspective,
  handlePieceDrop,
  whiteTurnToMove,
  moveData
}) => {

  const boardRef = useRef<HTMLDivElement>(null);
  const [bannerWidth, setBannerWidth] = useState<number>(0)

  useEffect(() => {
    if (!boardRef.current) return;

    const square = boardRef.current.children[1];
    const PROMOTION_OPTION_NUMBER = 4;
    const rect = square?.getBoundingClientRect();

    const squareWidth = rect.width;
    setBannerWidth(squareWidth * PROMOTION_OPTION_NUMBER)
  }, [board])
  
  return (
    <div className="board__container flex centered">
      <div className="board__interface">
        <img src="/assets/images/board/brown.png" className="board" />
        <div
          className={`square__container`}
          ref={boardRef}
        >
          {/* <PiecePromotionBanner color="white" bannerWidth={bannerWidth}/> */}
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
