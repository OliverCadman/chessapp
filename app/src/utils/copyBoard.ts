import { Board } from "../models/Board";

export const copyBoard: (initialBoard: Board) => Board = (
  initialBoard: Board,
) => {
  return JSON.parse(JSON.stringify(initialBoard));
};
