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
  DragStartEvent
} from "@dnd-kit/core";
import { customSnapCenterToCursor } from "../../modifiers";
import useArenaState from "../../store/arena";
import { PieceColors } from "../../constants/PieceColors";
import { PieceData } from "../../common/types/PieceData";


const Arena: React.FC = () => {
  const board = useArenaState((state) => state.board);
  const whiteTurnToMove = useArenaState((state) => state.whiteTurnToMove)
  const whitePerspective = useArenaState((state) => state.whitePerspective)
  const setMove = useArenaState((state) => state.setMove)
  const setPerspective = useArenaState((state) => state.setPerspective)
  const setActivePiece = useArenaState((state) => state.setActivePiece)
  const moveData = useArenaState((state) => state.moveData);

  console.log(board)

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
      coordinates,
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

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor)
  )

  return (
    <FullHeightContainer extraClasses="flex centered column">

        <Board
          handlePieceDrop={handlePieceDrop}
          board={board}
          whitePerspective={whitePerspective}
          whiteTurnToMove={whiteTurnToMove}
          moveData={moveData}          />
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
