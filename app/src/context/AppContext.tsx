import React, { createContext, useContext, useReducer } from "react";
import reducer from "../store/reducer";
import { AppState } from "../store/reducer.types";
import { IAppContext } from "./context.types";

const createInputLabel = (inputId: string) => {
  const cleansedInputId = inputId.replace(/[0-9]/i, "")
  const capitalised = cleansedInputId.substring(0, 1).toLocaleUpperCase()

  return capitalised + cleansedInputId.substring(1)
}

const appState: AppState = {
  loginInputs: Array.from(["email", "password"], (inputId, idx) => {
    return {
      inputId: `${inputId}${idx + 1}`,
      inputLabel: createInputLabel(inputId),
      inputValue: "",
      isInputValid: undefined,
      errorMessage: "",
    };
  }),

  signUpInputs: Array.from(["email", "password1", "password2"], (inputId) => {
    return {
      inputId,
      inputLabel: createInputLabel(inputId),
      inputValue: "",
      isInputValid: undefined,
      errorMessage: ""
    };
  }),
};

const AppContext: React.Context<IAppContext> = createContext<{
  appState: AppState;
  dispatch: React.Dispatch<any>;
}>({
  appState,
  dispatch: () => null,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const StateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, appState);

  return (
    <AppContext.Provider value={{ appState: state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext: () => IAppContext = () => useContext(AppContext);
