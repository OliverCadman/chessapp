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
  accessToken?: string;
  refreshToken?: string;
}

export type AuthState = {
  loginInputs: IInput[];
  signUpInputs: IInput[];
  tokens: IAuthToken;
  authenticationError?: string;
  setInput: (inputId: string, inputValue: string) => void;
  setInputsInvalid: (inputIds: IInvalidInput[]) => void;
};

export type LobbyState = {
  showChallengeModal: boolean;
};
