import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ConfettiExplosion from 'react-confetti-explosion';
import { calculatorButtons } from '../../data/calculatorButtons'; // Correct the import path
import { unit, sin, cos, tan } from 'mathjs';
import { GlobalStyle } from './GlobalStyle';
import { darkTheme, lightTheme } from './Theme';
import { FaMoon, FaSun, FaHistory } from 'react-icons/fa';
// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  width: 100vh;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  margin-top: 100px;
  position: relative;
`;

const Display = styled.div`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  width: 94%;
  height: 70px;
  text-align: right;
  padding: 2px;
  margin-bottom: 2px;
  border-radius: 10px;  // Adjust border radius as per your preference
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px; /* Adjust padding to make space for the history icon */
`;


const HistoryIcon = styled(FaHistory)`
  font-size: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
  position: absolute;
  left: 10px;  // Position the icon on the left side
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-row: repeat(6, 1fr);
  gap: 1px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: Orange;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  border: none;
  padding: 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
  &.operator {
    background-color: #f0a03a;
    color: white;
  }
  &.equals {
    background-color: #f0a03a;
    color: white;
    grid-column: span 1;
  }
  &.number {
    background-color: grey;
  }
  &.number-zero {
    grid-column: span 2;
  }
  &.black {
    background-color: #555;
  }
`;

const ThemeToggleButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px;
  margin: 20px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;  // Adjust size of the icons
  position: absolute;  // Position outside the container
  top: 20px;
  right: 20px;  // Place it at the top-right corner
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;
const HistorySection = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-top: 2px solid ${({ theme }) => theme.buttonBackground};
  position: absolute;
  bottom: -50px; /* Position it outside and below the main layout */
  left: 0;
  z-index: 10;
  display: ${({ showHistory }) => (showHistory ? 'block' : 'none')}; /* Show or hide based on state */
  max-height: 300px;
  overflow-y: auto; /* Scrollable if content overflows */
`;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [confetti, setConfetti] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [angleUnit, setAngleUnit] = useState('deg');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleButtonClick = (label, type) => {
    if (type === 'number') {
      setDisplay(display + label);
    } else if (type === 'operator') {
      setDisplay(display + ' ' + label + ' ');
    } else if (type === 'clear') {
      setDisplay('');
    } else if (type === 'equals') {
      try {
        const result = eval(display.replace('÷', '/').replace('×', '*'));
        setDisplay(result.toString());
        if (display.includes('5') && display.includes('6')) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3000);
        }
        setHistory([...history, { calculation: display, result }]);
      } catch (error) {
        setDisplay('Error');
      }
    } else if (type === 'memory') {
      if (label === 'mc') setMemory(0);
      if (label === 'm+') setMemory(memory + Number(display));
      if (label === 'm-') setMemory(memory - Number(display));
      if (label === 'mr') setDisplay(memory.toString());
    } else if (type === 'function') {
      handleScientificFunction(label);
    } else if (label === '%') {
      handlePercentage();
    } else if (label === '+/-') {
      toggleSign();
    } else if (label === '(') {
      handleOpeningParenthesis();
    } else if (label === ')') {
      handleClosingParenthesis();
    }
  };

  const handlePercentage = () => {
    let currentValue = parseFloat(display);
    let result = currentValue / 100;
    setDisplay(result.toString());
  };

  const toggleSign = () => {
    let currentValue = parseFloat(display);
    let result = currentValue * -1; // Toggle the sign
    setDisplay(result.toString());
  };

  const handleOpeningParenthesis = () => {
    setDisplay(display + '(');
  };

  const handleClosingParenthesis = () => {
    const openParensCount = (display.match(/\(/g) || []).length;
    const closeParensCount = (display.match(/\)/g) || []).length;

    if (openParensCount > closeParensCount) {
      setDisplay(display + ')');
    }
  };
  const toggleHistoryVisibility = () => {
    setShowHistory(!showHistory); // Toggle the visibility of history
  };

  const clearHistory = () => {
    setHistory([]);
  };
  
  const factorial = (n) => {
    if (n < 0) return 'Error'; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleScientificFunction = (label) => {
    let currentValue = parseFloat(display);
    let result;

    switch (label) {
      // Trigonometric Functions
      case 'sin':
        result = angleUnit === 'deg' ? sin(unit(currentValue, 'deg')) : sin(currentValue);
        break;
      case 'cos':
        result = angleUnit === 'deg' ? cos(unit(currentValue, 'deg')) : cos(currentValue);
        break;
      case 'tan':
        result = angleUnit === 'deg' ? tan(unit(currentValue, 'deg')) : tan(currentValue);
        break;

      // Hyperbolic Functions
      case 'sinh':
        result = Math.sinh(currentValue);
        break;
      case 'cosh':
        result = Math.cosh(currentValue);
        break;
      case 'tanh':
        result = Math.tanh(currentValue);
        break;

      // Logarithmic Functions
      case 'ln':
        result = Math.log(currentValue);  // Natural logarithm
        break;
      case 'log₁₀':
        result = Math.log10(currentValue);  // Logarithm base 10
        break;

      // Exponential Functions
      case 'eˣ':
        result = Math.exp(currentValue);
        break;
      case '10ˣ':
        result = Math.pow(10, currentValue);
        break;

      // Factorial
      case 'x!':
        result = factorial(currentValue);
        break;

      // Roots
      case '²√x':
        result = Math.sqrt(currentValue);
        break;
      case '³√x':
        result = Math.cbrt(currentValue);
        break;
      case 'ʸ√x':
        const root = parseFloat(prompt('Enter the root value:'));
        result = Math.pow(currentValue, 1 / root);
        break;

      // Reciprocal and Powers
      case '¹/x':
        result = 1 / currentValue;
        break;
      case 'x²':
        result = Math.pow(currentValue, 2);
        break;
      case 'x³':
        result = Math.pow(currentValue, 3);
        break;
      case 'xʸ':
        const power = parseFloat(prompt('Enter the exponent:'));
        result = Math.pow(currentValue, power);
        break;

      // Constants
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;

      // Random Number
      case 'Rand':
        result = Math.random();
        break;

      // Angle Conversion
      case 'Rad':
        setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg');
        return;

      default:
        result = display;
    }

    setDisplay(result.toString());
  };

  return (
    <div>
        <Heading>Scientific Calculator</Heading>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Container>
        
          {confetti && <ConfettiExplosion />}
          <Display>
          {/* History Icon on the left */}
          <HistoryIcon onClick={toggleHistoryVisibility} />

          {/* Display current result */}
          <div>{display}</div>
        </Display>
          
          <ButtonGrid>
            {calculatorButtons.map((button, index) => (
              <Button
                key={index}
                className={`${button.type} ${button.label === '0' ? 'number-zero' : ''} ${button.label === '%' || button.label === '+/-' ? 'black' : ''}`}
                onClick={() => handleButtonClick(button.label, button.type)}
              >
                {button.label}
              </Button>
            ))}
          </ButtonGrid>
          
        </Container>
        <HistorySection showHistory={showHistory}>
  <h4>Calculation History</h4>
  {history.length === 0 ? (
    <p>No history available.</p>
  ) : (
    history.map((item, index) => (
      <div key={index} style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
        <strong>{item.calculation}</strong> = {item.result}
      </div>
    ))
  )}
  {history.length > 0 && (
    <button
      onClick={clearHistory}
      style={{
        marginTop: '10px',
        background: '#ff4d4f',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Clear History
    </button>
  )}
</HistorySection>

      </ThemeProvider>
      <div style={{ textAlign: 'center' }}>
        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggleButton>
      </div>
      
    </div>
  );
};

export default Calculator;
