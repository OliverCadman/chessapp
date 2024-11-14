import React from "react";
import { AppState } from "../store/reducer.types";

export interface IAppContext {
  appState: AppState;
  dispatch: React.Dispatch<any>;
}
