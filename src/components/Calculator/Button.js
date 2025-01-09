import React from 'react';

const Button = ({ label, type, handleButtonClick }) => {
  return (
    <button onClick={() => handleButtonClick(label, type)}>{label}</button>
  );
};

export default Button;
