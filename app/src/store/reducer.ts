import { Reducer } from "react";
import { AppAction, AppState } from "./reducer.types";

const reducer: Reducer<AppState, AppAction> = (
  state: AppState,
  action: AppAction,
) => {
  switch (action.type) {
    case "FORM_INPUT": {
      const inputToUpdate = state.loginInputs.find((input) => input.inputId == action.payload.id);
      if (!inputToUpdate) return {...state};

      return {
        ...state,
        loginInputs: state.loginInputs.map((input) => {
            if (input.inputId === action.payload.id) {
              return {
                ...input,
                inputValue: action.payload.value
              }
            } else return input
          })
      
      }
    }
    case "SUBMIT_FORM": {
      return {
        ...state,
      };
    }
    case "INVALID_FORM": {
      return {
        ...state,
        loginInputs: state.loginInputs.map((input) => {
          if (action.payload.map((x: any) => x.inputId).includes(input.inputId)) {
            return {
              ...input,
              isInputValid: false,
              errorMessage: action.payload.find((x: any) => x.inputId === input.inputId).errorMsg
            }
          } else return input;
        })
      }
    }
    default:
      throw new Error("Action type not supported.");
  }
};

export default reducer;
