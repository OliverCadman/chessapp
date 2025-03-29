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
  color: string;
  coordinates: { [key: string]: number };
}

export type ArenaState = {
  board: Board;
  whitePerspective: boolean;
  activePiece: IActivePiece | null;
  whiteTurnToMove: boolean;
  setMove: (
    board: Square[][],
    toCoordinates: CoordType,
    fromCoordinates: CoordType
  ) => void
};
