import { create } from "zustand";
import { ArenaState } from "./store.types";
import { Board } from "../models/Board";
import { CoordType } from "../common/types/CoordType";
import BoardManager from "../models/BoardManager";
import Square from "../models/Square";

const boardManager = new BoardManager();

const useArenaState = create<ArenaState>((set) => ({
  board: new Board(true).getBoard(),
  whitePerspective: true,
  whiteTurnToMove: true,
  activePiece: null,
  setMove: (
    board: Square[][],
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    fromNotation: string,
    toNotation: string
  )  => set((state) => {
      const newBoard = boardManager.makeMove(
        board,
        toCoordinates,
        fromCoordinates,
        fromNotation,
        toNotation
      )

      return {
        ...state,
        board: newBoard && newBoard[0],
        whiteTurnToMove: newBoard && newBoard[1] ? !state.whiteTurnToMove : state.whiteTurnToMove
      }
  })
}));

export default useArenaState;
