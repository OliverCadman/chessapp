import React, {useState, useEffect} from "react";
import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import Board from "../../components/Board/Board";
import { CoordType } from "../../common/types/CoordType";
import {
  DndContext, 
  PointerSensor,
  useSensors,
  useSensor,
  MouseSensor, 
  TouchSensor,
  closestCenter
} from "@dnd-kit/core";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import {snapCenterToCursor} from "@dnd-kit/modifiers";
import useArenaState from "../../store/arena";
import { PieceColors } from "../../constants/PieceColors";
import { PieceData } from "../../common/types/PieceData";
import { SquareData } from "../../common/types/SquareData";


const Arena: React.FC = () => {
  const board = useArenaState((state) => state.board);
  const whiteTurnToMove = useArenaState((state) => state.whiteTurnToMove);
  const whitePerspective = useArenaState((state) => state.whitePerspective);
  const setMove = useArenaState((state) => state.setMove);
  const setPerspective = useArenaState((state) => state.setPerspective);
  const promotionData = useArenaState((state) => state.promotionData);
  const setPromotionData = useArenaState((state) => state.setPromotionData);
  const clearPromotionData = useArenaState((state) => state.clearPromotionData);
  const moveData = useArenaState((state) => state.moveData);
  const setActiveSquare = useArenaState((state) => state.setActiveSquare);

  const [childRef, setChildRef] = useState<HTMLDivElement>();
  const [promotionBannerWidth, setPromotionBannerWidth] = useState<number>(0);

  useEffect(() => {
    if (!childRef) return;
    const square = childRef.children[1];
    const PROMOTION_OPTION_NUMBER = 4;
    const rect = square?.getBoundingClientRect();
    const squareWidth = rect.width;
    setPromotionBannerWidth(squareWidth * PROMOTION_OPTION_NUMBER);

  }, [childRef]);

  const handlePiecePromoClick = (piece: string) => {
 
    if (!promotionData) return;

    const {
      pieceId, 
      pieceColor,
      fromCoords, 
      toCoords, 
      fromNotation, 
      toNotation
    } = promotionData; 

    setMove(
      board,
      pieceId,
      pieceColor,
      toCoords,
      fromCoords,
      fromNotation,
      toNotation,
      true,
      piece
    )

    clearPromotionData();
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {
      fromCoordinates,
      pieceId,
      pieceColor,
      fromNotation
    } = event.active.data.current as PieceData;

    const {toCoordinates, toNotation} = event.over?.data.current as SquareData;

    const rank = parseInt(toNotation.split("")[1])
    const pieceNotation = pieceId.split("")[1]

    if (
      pieceNotation === "p" &&
      (
        (pieceColor === PieceColors.WHITE && rank === 8) || 
        (pieceColor === PieceColors.BLACK && rank === 1)
      )
    ) {
      console.log(
        fromCoordinates,
        toCoordinates,
        fromNotation,
        toNotation,
        pieceId,
        pieceColor
      )
      setPromotionData(
        pieceId, 
        pieceColor, 
        fromCoordinates,
        toCoordinates,
        fromNotation,
        toNotation,
        null, 
        promotionBannerWidth);




    } else {
        setMove(
          board,
          pieceId,
          pieceColor,
          toCoordinates,
          fromCoordinates,
          fromNotation,
          toNotation,
          false,
          null
        )
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const {active, over} = event;

    const {id: fromId} = active;
    const {toNotation: toId} = over?.data.current as SquareData;

    if (fromId === toId) return;

    setActiveSquare(toId);

  }

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor)
  )

  return (
    <FullHeightContainer extraClasses="flex centered column">
      <DndContext
        sensors={sensors}
        // onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        modifiers={[snapCenterToCursor]}
        collisionDetection={closestCenter}
      >
        <Board
          onRefReady={setChildRef}
          promotionData={promotionData}
          board={board}
          whitePerspective={whitePerspective}
          whiteTurnToMove={whiteTurnToMove}
          moveData={moveData}   
          handlePiecePromoClick={handlePiecePromoClick}       
          />
      </DndContext>
      <button
        className="btn challenge-btn"
        style={{ marginTop: "1rem" }}
        onClick={() => setPerspective(board)}
        >
        Toggle Perspective
      </button>
    </FullHeightContainer>
  );
};

export default Arena;
