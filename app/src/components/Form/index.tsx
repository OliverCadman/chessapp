import React from "react";
import { IInput } from "../../store/reducer.types";
import FormError from "../FormError";


interface FormProps {
  isSignUpForm: boolean;
  inputs: IInput[];
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleChange: (e: React.SyntheticEvent) => void;
}

const Form: React.FC<FormProps> = ({
  isSignUpForm,
  inputs,
  handleSubmit,
  handleChange
}) => {

  return (
    <div className="fill-height flex centered">
      <div className="form__container flex centered">
        <div className="form__wrapper">
          <form onSubmit={handleSubmit}>
            {
              inputs.map((input) => {
     
                return (
                  <div className="form__input">
                    <label htmlFor={input.inputId}>{input.inputLabel}</label>
                    <input
                      value={input.inputValue}
                      id={input.inputId}
                      type="text"
                      placeholder={`Enter your ${input.inputId}`}
                      onChange={handleChange}
                    />
                  </div>
                )
              })
            }
            <div className="form__input flex centered">
              <button className="btn" type="submit">
                {isSignUpForm ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
