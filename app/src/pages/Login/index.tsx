import React from "react";
import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import Form from "../../components/Form";
import { useLoginStore } from "../../store/auth";
import { IInput } from "../../store/store.types";
import { useMutation } from "@tanstack/react-query";
import { APIClient } from "../../api/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const apiClient = new APIClient();

  const loginInputs = useLoginStore((state) => state.loginInputs);
  const authenticationError = useLoginStore(
    (state) => state.authenticationError,
  );

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return apiClient.loginRequest(payload);
    },

    onSuccess: (data) => {
      console.log("DATA", data);
      const { access: accessToken, refresh: refreshToken } = data;
      useLoginStore.setState((prevState) => {
        return {
          ...prevState,
          tokens: {
            accessToken,
            refreshToken,
          },
        };
      });

      navigate("/arena/lobby");
    },
    onError: (err) => {
      useLoginStore.setState((prevState) => {
        return {
          ...prevState,
          authenticationError: err.message,
        };
      });
    },
  });

  const validateForm = () => {
    const invalidIDs = [];

    const inputs = loginInputs;
    for (let input of inputs) {
      const { inputId, inputValue } = input;
      if (!inputValue) {
        const errorMsg = "This field cannot be blank.";
        invalidIDs.push({
          inputId,
          errorMsg,
        });
      }
    }
    return invalidIDs.length > 0 ? invalidIDs : false;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const invalidInputIDs = validateForm();

    if (invalidInputIDs) {
      useLoginStore.setState((state) => {
        return {
          ...state,
          loginInputs: state.loginInputs.map((input: IInput) => {
            if (
              invalidInputIDs.map((x: any) => x.inputId).includes(input.inputId)
            ) {
              return {
                ...input,
                isInputValid: false,
                errorMessage: invalidInputIDs.find(
                  (x: any) => x.inputId === input.inputId,
                )!.errorMsg,
              };
            } else return input;
          }),
        };
      });
    } else {
      const [email, password] = loginInputs.map((input) => input.inputValue);
      const payload = { email, password };

      mutate(payload);
    }
  };

  const handleChange = (e: React.FormEvent) => {
    const inputEl = e.target as HTMLInputElement;

    const inputValue = inputEl.value;
    const inputId = inputEl.id;

    useLoginStore.setState((state) => {
      const inputToUpdate = state.loginInputs.find(
        (input: IInput) => input.inputId == inputId,
      );
      if (!inputToUpdate) return { ...state };

      return {
        ...state,
        authenticationError: undefined,
        loginInputs: state.loginInputs.map((input: IInput) => {
          if (input.inputId === inputId) {
            return {
              ...input,
              inputValue: inputValue,
              isInputValid: true,
              errorMessage: "",
            };
          } else return input;
        }),
      };
    });
  };

  return (
    <FullHeightContainer>
      <div className="flex centered h-100">
        <Form
          authenticationError={authenticationError}
          pendingSubmissionResult={isPending}
          handleChange={handleChange}
          inputs={loginInputs}
          handleSubmit={handleSubmit}
          isSignUpForm={false}
        />
      </div>
    </FullHeightContainer>
  );
};

export default Login;
