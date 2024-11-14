import React from "react";

interface FormProps {
  isSignUpForm: boolean;
}

const Form: React.FC<FormProps> = ({ isSignUpForm }) => {
  return (
    <div className="fill-height flex centered">
      <div className="form__container flex centered">
        <div className="form__wrapper">
          <div className="form__input">
            <label htmlFor="email">Email.</label>
            <input id="email" type="text" placeholder="Enter your email" />
          </div>
          <div className="form__input">
            <label htmlFor="pass">Password.</label>
            <input id="pass" type="text" placeholder="Enter your password" />
          </div>

          {
            // Display second password input for users signing up.
            isSignUpForm ? (
              <div className="form__input">
                <label htmlFor="pass-2">And again.</label>
                <input
                  id="pass-2"
                  type="text"
                  placeholder="Enter your password"
                />
              </div>
            ) : (
              ""
            )
          }
          <div className="form__input flex centered">
            <button className="btn">
              {isSignUpForm ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
