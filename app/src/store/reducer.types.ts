import { ActionTypes } from "./reducer.enums";

export interface IInput {
  inputId: string;
  inputLabel: string;
  inputValue: string;
  isInputValid?: boolean;
  errorMessage: string;
}

export type StateTypes = {
  inputs: IInput[];
};

export type AppState = {
  loginInputs: IInput[];
  signUpInputs: IInput[];
};

export interface AppAction {
  type: ActionTypes;
  payload: any;
}

export type Dispatch = (action: AppAction) => any;
