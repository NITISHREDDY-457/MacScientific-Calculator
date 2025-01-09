import React from 'react';
import Button from './Button';
import { calculatorButtons } from '../../data/calculatorButtons'; // Correct the import path

const ButtonGrid = ({ handleButtonClick }) => {
  return (
    <div>
      {calculatorButtons.map((button, index) => (
        <Button key={index} label={button.label} type={button.type} handleButtonClick={handleButtonClick} />
      ))}
    </div>
  );
};

export default ButtonGrid;
