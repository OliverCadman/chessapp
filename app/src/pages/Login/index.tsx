import React, {useRef, useCallback, useEffect} from "react";
import Form from "../../components/Form";
import { useAppContext } from "../../context/AppContext";

const Login = () => {

  const { appState, dispatch } = useAppContext();

  const validateForm = () => {
   const invalidIDs = [];
   const inputs = appState.loginInputs;
   for (let input of inputs) {
      const {inputId, inputValue} = input;
      if (!inputValue) {
        const errorMsg = "This field cannot be blank."
        invalidIDs.push({
          inputId,
          errorMsg
        })
      }
   }
   return invalidIDs.length > 0 ? invalidIDs : false; 

  }

  const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault(); 

        const invalidInputIDs = validateForm();
        
        if (invalidInputIDs) dispatch({
          type: "INVALID_FORM",
          payload: invalidInputIDs
        })

        else return;
      
    }

  const handleChange = (e: React.FormEvent) => {
    const inputEl = e.target as HTMLInputElement

    const value = inputEl.value;
    const id = inputEl.id;

    dispatch({
      type: "FORM_INPUT",
      payload: {id, value}
    })
  }
 
  return <Form handleChange={handleChange} inputs={appState.loginInputs} handleSubmit={handleSubmit} isSignUpForm={false}/>;
};

export default Login;
