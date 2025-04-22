import React from "react";
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
import type { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
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
  const activePiece = useArenaState((state) => state.activePiece);
  const setActivePiece = useArenaState((state) => state.setActivePiece);
  const moveData = useArenaState((state) => state.moveData);
  const setActiveSquare = useArenaState((state) => state.setActiveSquare);

  const handlePieceDrop = (
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    color: string,
    whiteTurnToMove: boolean,
    fromNotation: string,
    toNotation: string
  ) => {

    if (color === PieceColors.BLACK && whiteTurnToMove || 
      color === PieceColors.WHITE && !whiteTurnToMove) return 
    
    setMove(
      board,
      toCoordinates,
      fromCoordinates,
      fromNotation,
      toNotation
    )
  };

  const handleDragStart = (event: DragStartEvent) => {

    if (!event || !event.active.data.current) return;

    const {
      fromCoordinates: coordinates,
      whiteTurnToMove,
      pieceId,
      pieceColor,
      pieceName,
      notation
    } = event.active.data.current as PieceData;
   
    setActivePiece(
      whiteTurnToMove,
      pieceName,
      pieceId,
      pieceColor,
      coordinates,
      notation
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {
      fromCoordinates,
      whiteTurnToMove,
      pieceId,
      pieceColor,
      pieceName,
      fromNotation
    } = event.active.data.current as PieceData;

    const {toCoordinates, toNotation} = event.over?.data.current as SquareData;

    setMove(
      board,
      pieceId,
      toCoordinates,
      fromCoordinates,
      fromNotation,
      toNotation
    )
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        modifiers={[snapCenterToCursor]}
        collisionDetection={closestCenter}
      >
        <Board
          handlePieceDrop={handlePieceDrop}
          board={board}
          whitePerspective={whitePerspective}
          whiteTurnToMove={whiteTurnToMove}
          moveData={moveData}          
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
