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
  promotionData: null,
  bannerRect: {
    x: 0,
    left: 0
  },
  setActiveSquare: (notation: string) => set((state) => ({
    ...state,
    activeSquare: notation
  })),
  setMove: (
    board: Square[][],
    pieceId: string,
    color: string,
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    fromNotation: string,
    toNotation: string,
    isPromotion: boolean,
    promotionPiece: string | null

  )  => set((state) => {
      let newBoard;

      if (!isPromotion) {
          newBoard = boardManager.makeMove(
          board,
          color,
          pieceId,
          toCoordinates,
          fromCoordinates,
          fromNotation,
          toNotation,
          null
        )
      } else {
        newBoard = boardManager.makeMove(
          board,
          color,
          pieceId,
          toCoordinates,
          fromCoordinates,
          fromNotation,
          toNotation,
          promotionPiece
        )
      }

      return {
        ...state,
        board: newBoard?.board,
        whiteTurnToMove: newBoard && newBoard.validMove ? !state.whiteTurnToMove : state.whiteTurnToMove,
        moveData: newBoard?.validMove ? newBoard.moveData : state.moveData,
        activeSquare: null,
        activePiece: null
      }
  }),
  clearPromotionData: () => set((state) => ({...state, promotionData: null})),
  setPromotionData: (
    pieceId: string,
    pieceColor: string,
    fromCoords: {[key: string]: number},
    toCoords: {[key: string]: number},
    fromNotation: string,
    toNotation: string,
    promotionSelection: string | null,
    promotionBannerWidth: number
  ) => set((state) => {

    const x = toCoords.x;
    let left;

    console.log(boardManager.createPromotionSquareArray(pieceId, toCoords, pieceColor))

    if (x > 0 && x <= 4) {
      left = x * promotionBannerWidth / 4;
    } else if (x > 4) {
      left = promotionBannerWidth
    } else {
      left = 0
    } 
    return {
    ...state,
    promotionData: {
      pieceId,
      pieceColor,
      fromCoords,
      toCoords,
      fromNotation,
      toNotation,
      promotionSelection,
      bannerRect: {
        width: promotionBannerWidth,
        left
      }
    }
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
