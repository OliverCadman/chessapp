export interface PieceMapType {
  [key: string]: string[];
};

const PieceMap: PieceMapType = {
  pawn: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png",
  ],
  knight: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png",
  ],
  bishop: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png",
  ],
  king: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/1920px-Chess_klt45.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png",
  ],
  queen: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/1920px-Chess_qlt45.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1920px-Chess_qdt45.svg.png",
  ],
  rook: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_rlt45.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png",
  ],
};

export default PieceMap;
