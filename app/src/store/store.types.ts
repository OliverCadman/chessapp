import Board from "../models/Board";
import { CoordType } from "../common/types/CoordType";
import Square from "../models/Square";

export interface IInput {
  inputId: string;
  inputLabel: string;
  inputValue: string;
  isInputValid?: boolean;
  errorMessage: string;
}

export interface IInvalidInput {
  inputId: string;
  errorMsg: string;
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}

export type AuthState = {
  loginInputs: IInput[];
  signUpInputs: IInput[];
  tokens: IAuthToken;
  authenticationError?: string;
  setInput: (inputId: string, inputValue: string) => void;
  setInputsInvalid: (inputIds: IInvalidInput[]) => void;
};

interface ITimeControls {
  minutesPerSide: string;
  increment: string;
}

interface ILastSeen {
  dateUnit: string;
  timeDiff: string;
}

interface IPlayer {
  user: {
    email?: string;
    id?: number;
  };
  lastSeen: ILastSeen;
}

export enum Colors {
  BLACK = "black",
  WHITE = "white",
  RANDOM = "random",
}

interface IChallengeOptions {
  timeControls: ITimeControls;
  color?: string;
}

export interface IPlayerListPayload {
  group_name: string;
  room_name: string;
  type: string;
  data: {
    current_user_email: string;
  };
}

export type LobbyState = {
  challengeModalProps: {
    showChallengeModal: boolean;
    opponentId?: number;
    opponentName?: string;
    playersChallenged: number[];
  };
  challengeOptions: IChallengeOptions;
  players: IPlayer[];
  playerListPayload?: IPlayerListPayload;
};

interface IActivePiece {
  pieceId: string;
  coordinates: { [key: string]: number };
  whiteTurnToMove: boolean;
  pieceName: string;
  pieceColor: string;
  notation: string;
}

export interface IMoveData {
  from: string,
  to: string
  inCheck: boolean;
  pieceColor: string;
}

export interface IPromotionData {
  pieceId: string,
  pieceColor: string;
  fromCoords: {[key: string]: number};
  toCoords: {[key: string]: number};
  fromNotation: string;
  toNotation: string;
  promotionSelection: string | null;
  bannerRect: {[key: string]: number};
}


export type ArenaState = {
  board: Board;
  whitePerspective: boolean;
  activePiece: IActivePiece | null;
  whiteTurnToMove: boolean;
  moveData: IMoveData | null;
  activeSquare: string | null;
  promotionData: IPromotionData | null;
  setActiveSquare: (notation: string) => void;
  setMove: (
    board: Square[][],
    color: string,
    pieceId: string,
    toCoordinates: CoordType,
    fromCoordinates: CoordType,
    fromNotation: string,
    toNotation: string,
    isPromotion: boolean,
    promotionPiece: string | null
  ) => void
  setActivePiece: (
    whiteTurnToMove: boolean,
    pieceName: string,
    pieceId: string,
    pieceColor: string,
    coordinates: {[key: number]: number},
    notation: string
  ) => void;
  setPromotionData: (
    pieceId: string,
    pieceColor: string,
    fromCoords: {[key: string]: number},
    toCoords: {[key: string]: number},
    fromNotation: string,
    toNotation: string,
    promotionSelection: string | null,
    promotionBannerWidth: number,
  ) => void;
  clearPromotionData: () => void;
  setPerspective: (
    board: Square[][]
  ) => void;
};
