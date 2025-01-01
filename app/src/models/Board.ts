import Square from "./Square";

class Board {
  playerIsWhite: boolean;
  boardInterface: Square[][];

  constructor(playerIsWhite: boolean) {
    this.playerIsWhite = playerIsWhite;
    this.boardInterface = [];
  }

  getBoard() {
    return this.boardInterface;
  }

  init() {
    const FILES: string[] = this.playerIsWhite
      ? ["a", "b", "c", "d", "e", "f", "g", "h"]
      : ["h", "g", "f", "e", "d", "c", "b", "a"];

    const RANKS: string[] = this.playerIsWhite
      ? ["1", "2", "3", "4", "5", "6", "7", "8"]
      : ["8", "7", "6", "5", "4", "3", "2", "1"];

    for (let i = 0; i < FILES.length; i++) {
      this.boardInterface.push([]);
      for (let j = 0; j < RANKS.length; j++) {
        this.boardInterface[i].push(
          new Square({ x: j, y: i }, FILES[i] + RANKS[j]),
        );
      }
    }
  }
}

export default Board;
