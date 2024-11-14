import { ActionTypes } from "./reducer.enums";

export interface IInput {
  inputId: string;
  inputValue: string;
  isInputValid?: boolean;
}

export type StateTypes = {
  inputs: IInput[];
};

export type AppState = {
  loginInputs: IInput[];
};

export interface AppAction {
  type: ActionTypes;
  payload: any;
}

export type Dispatch = (action: AppAction) => any;
