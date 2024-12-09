import { create } from "zustand";
import { AuthState, IInput } from "./store.types";

const createInputLabel = (inputId: string) => {
  const cleansedInputId = inputId.replace(/[0-9]/i, "");
  const capitalised = cleansedInputId.substring(0, 1).toLocaleUpperCase();

  return capitalised + cleansedInputId.substring(1);
};

export const useLoginStore = create<AuthState>((set) => ({
  loginInputs: Array.from(["email", "password"], (inputId, idx) => {
    return {
      inputId: `${inputId}${idx + 1}`,
      inputLabel: createInputLabel(inputId),
      inputValue: "",
      isInputValid: undefined,
      errorMessage: "",
    };
  }),
  signUpInputs: Array.from(
    ["email", "password", "password"],
    (inputId, idx) => {
      return {
        inputId: `${inputId}${idx + 1}`,
        inputLabel: createInputLabel(inputId),
        inputValue: "",
        isInputValid: undefined,
        errorMessage: "",
      };
    },
  ),
  authenticationError: undefined,
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
  setInput: (inputId: string, inputValue: string) =>
    set((state: any) => {
      const inputToUpdate = state.loginInputs.find(
        (input: IInput) => input.inputId == inputId,
      );
      if (!inputToUpdate) return { ...state };

      return {
        ...state,
        loginInputs: state.loginInputs.map((input: IInput) => {
          if (input.inputId === inputId) {
            return {
              ...input,
              inputValue: inputValue,
            };
          } else return input;
        }),
      };
    }),
  setInputsInvalid: (inputIds) =>
    set((state: any) => {
      return {
        ...state,
        loginInputs: state.loginInputs.map((input: IInput) => {
          if (inputIds.map((x: any) => x.inputId).includes(input.inputId)) {
            return {
              ...input,
              isInputValid: false,
              errorMessage: inputIds.find(
                (x: any) => x.inputId === input.inputId,
              )?.errorMsg,
            };
          } else return input;
        }),
      };
    }),
}));

// export const unsubscribeAuth = useLoginStore.subscribe()
