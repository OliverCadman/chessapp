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

export type AuthState = {
  loginInputs: IInput[];
  signUpInputs: IInput[];
  authenticationError?: string;
  setInput: (inputId: string, inputValue: string) => void;
  setInputsInvalid: (inputIds: IInvalidInput[]) => void;
};
