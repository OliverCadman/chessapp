import React from "react";
import { AppState } from "../store/store.types";

export interface IAppContext {
  appState: AppState;
  dispatch: React.Dispatch<any>;
}
