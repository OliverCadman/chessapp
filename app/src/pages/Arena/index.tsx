import React from "react";
import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import Board from "../../components/Board/Board";
import { CoordType } from "../../common/types/CoordType";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import mobileCheck from "../../utils/mobileDeviceCheck";

import useArenaState from "../../store/arena";
import { PieceColors } from "../../constants/PieceColors";

const Arena: React.FC = () => {
  const board = useArenaState((state) => state.board);
  const whiteTurnToMove = useArenaState((state) => state.whiteTurnToMove)
  const whitePerspective = useArenaState((state) => state.whitePerspective)
  const setMove = useArenaState((state) => state.setMove)
  const moveData = useArenaState((state) => state.moveData)

  const handlePieceDrop = (
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    color: string,
    whiteTurnToMove: boolean,
    fromNotation: string,
    toNotation: string
  ) => {

    console.group("Move info")
    console.log(fromCoordinates, toCoordinates)
    console.log(`From ${fromNotation} to ${toNotation}`)
    console.groupEnd()

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

  return (
    <FullHeightContainer extraClasses="flex centered column">
      <DndProvider debugMode={true} backend={mobileCheck() ? TouchBackend : HTML5Backend}>
        <Board
          handlePieceDrop={handlePieceDrop}
          board={board}
          whitePerspective={whitePerspective}
          whiteTurnToMove={whiteTurnToMove}
          moveData={moveData}
        />
      </DndProvider>
      <button
        className="btn challenge-btn"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          useArenaState.setState((prevState) => {
            return {
              ...prevState,
              whitePerspective: !prevState.whitePerspective,
            };
          });
        }}
      >
        Toggle Perspective
      </button>
    </FullHeightContainer>
  );
};

export default Arena;
