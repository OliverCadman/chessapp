import { create } from "zustand";
import { ArenaState } from "./store.types";
import { Board } from "../models/Board";
import { CoordType } from "../common/types/CoordType";
import BoardManager from "../models/BoardManager";
import Square from "../models/Square";
import {cloneDeep} from "lodash";

const boardManager = new BoardManager();

const useArenaState = create<ArenaState>((set) => ({
  board: new Board(true).getBoard(),
  whitePerspective: true,
  whiteTurnToMove: true,
  activePiece: null,
  moveData: null,
  activeSquare: null,
  setActiveSquare: (notation: string) => set((state) => ({
    ...state,
    activeSquare: notation
  })),
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
        moveData: newBoard?.validMove ? newBoard.moveData : state.moveData,
        activeSquare: null
      }
  }),
  setActivePiece: (
    whiteTurnToMove: boolean,
    pieceName: string,
    pieceId: string,
    pieceColor: string,
    coordinates: {[key: number]: number},
    notation: string
  ) => set((state) => ({
    ...state,
    activePiece: {
      whiteTurnToMove,
      pieceName,
      pieceId,
      pieceColor,
      coordinates,
      notation
    }
  })),
  setPerspective: () => set((state) => {
    const boardCopy = cloneDeep(state.board);
    const newBoard = boardManager.rotateBoard(boardCopy);

    return {
      ...state,
      board: newBoard,
      whitePerspective: !state.whitePerspective
    }
  })
}));

export default useArenaState;
