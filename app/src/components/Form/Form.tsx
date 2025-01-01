import React from "react";
import { IInput } from "../../store/store.types";
import FormError from "../FormError/FormError";
import Spinner from "../Spinner/Spinner";

interface FormProps {
  isSignUpForm: boolean;
  inputs: IInput[];
  authenticationError?: string;
  pendingSubmissionResult: boolean;
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleChange: (e: React.SyntheticEvent) => void;
}

const Form: React.FC<FormProps> = ({
  isSignUpForm,
  pendingSubmissionResult,
  inputs,
  handleSubmit,
  handleChange,
  authenticationError,
}) => {
  return (
    <div className="fill-height flex centered">
      <div className="form__container flex centered">
        <div className="form__wrapper">
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => {
              return (
                <div className="form__input" key={input.inputId}>
                  <label htmlFor={input.inputId}>{input.inputLabel}</label>
                  <input
                    value={input.inputValue}
                    id={input.inputId}
                    type="text"
                    placeholder={`Enter your ${input.inputLabel.toLocaleLowerCase()}`}
                    onChange={handleChange}
                    className={
                      input.errorMessage ||
                      (authenticationError && !pendingSubmissionResult)
                        ? "border-danger"
                        : ""
                    }
                  />
                  {input.errorMessage ? (
                    <FormError message={input.errorMessage} />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            {authenticationError && !pendingSubmissionResult ? (
              <FormError message={authenticationError} />
            ) : (
              ""
            )}
            <div className="form__input flex centered">
              {pendingSubmissionResult ? (
                <Spinner />
              ) : (
                <button
                  className="btn bg-dusk white-text extra-light btn-shadow"
                  type="submit"
                >
                  {isSignUpForm ? "Sign Up" : "Login"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
