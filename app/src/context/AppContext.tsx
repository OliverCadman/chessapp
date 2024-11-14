import React, { createContext, useContext, useReducer } from "react";
import reducer from "../store/reducer";
import { AppState } from "../store/reducer.types";
import { IAppContext } from "./context.types";

const appState: AppState = {
  loginInputs: Array.from(["email", "password"], (inputId) => {
    return {
      inputId,
      inputValue: "",
      isInputValid: undefined,
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

export const UseAppContext: () => IAppContext = () => useContext(AppContext);
