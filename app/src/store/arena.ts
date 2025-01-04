import { create } from "zustand";
import { ArenaState } from "./store.types";
import Board from "../models/Board";

const useArenaState = create<ArenaState>(() => ({
  board: new Board(true), // Boolean flag. true = White's perspective.
  whitePerspective: true,
  activePiece: null,
}));

export default useArenaState;
