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
  moveData: null,
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
        board: newBoard?.board,
        whiteTurnToMove: newBoard && newBoard.validMove ? !state.whiteTurnToMove : state.whiteTurnToMove,
        moveData: newBoard?.validMove ? newBoard.moveData : state.moveData
      }
  })
}));

export default useArenaState;
