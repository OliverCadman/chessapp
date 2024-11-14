import { Reducer } from "react";
import { AppAction, AppState } from "./reducer.types";

const reducer: Reducer<AppState, AppAction> = (
  state: AppState,
  action: AppAction,
) => {
  switch (action.type) {
    case "SUBMIT_FORM": {
      return {
        ...state,
      };
    }
    default:
      throw new Error("Action type not supported.");
  }
};

export default reducer;
