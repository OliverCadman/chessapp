import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import Board from "../../components/Board/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import mobileCheck from "../../utils/mobileDeviceCheck";

import useArenaState from "../../store/arena";

const Arena = () => {
  const gameBoard = useArenaState((state) => state.board);
  const whitePerspective = useArenaState((state) => state.whitePerspective);

  const handlePieceDrop = () => {
    console.log("piece dropped");
    gameBoard.makeMove();
  };

  return (
    <FullHeightContainer extraClasses="flex centered column">
      <DndProvider backend={mobileCheck() ? TouchBackend : HTML5Backend}>
        <Board
          handlePieceDrop={handlePieceDrop}
          board={gameBoard.getBoard()}
          whitePerspective={whitePerspective}
          whiteTurnToMove={gameBoard.whiteTurnToMove}
          game={gameBoard}
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
