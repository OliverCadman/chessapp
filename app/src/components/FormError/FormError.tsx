import React from "react";

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="form__error font-secondary light">
      <p>{message}</p>
    </div>
  );
};

export default FormError;
