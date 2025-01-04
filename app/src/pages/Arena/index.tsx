import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import Board from "../../components/Board/Board";

import useArenaState from "../../store/arena";

const Arena = () => {
  const gameBoard = useArenaState((state) => state.board);
  const whitePerspective = useArenaState((state) => state.whitePerspective);
  const activePiece = useArenaState((state) => state.activePiece);

  const handlePieceClick = (
    coordinates: { [key: string]: number },
    pieceName: string,
    pieceId: string,
  ) => {
    console.group("Selected piece props.");
    console.log("Coordinates:", coordinates);
    console.log("Piece Name:", pieceName);
    console.log("Piece ID:", pieceId);
    console.groupEnd();
  };

  return (
    <FullHeightContainer extraClasses="flex centered column">
      <Board
        board={gameBoard.getBoard()}
        whitePerspective={whitePerspective}
        handlePieceClick={handlePieceClick}
      />
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
