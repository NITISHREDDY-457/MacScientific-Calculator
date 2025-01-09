import * as math from 'mathjs';

export const handleButtonClick = (
  label,
  type,
  display,
  setDisplay,
  setConfetti,
  memory,
  setMemory
) => {
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
    } catch (error) {
      setDisplay('Error');
    }
  } else if (type === 'memory') {
    if (label === 'mc') setMemory(0);
    if (label === 'm+') setMemory(memory + Number(display));
    if (label === 'm-') setMemory(memory - Number(display));
    if (label === 'mr') setDisplay(memory.toString());
  } else if (type === 'function') {
    handleScientificFunction(label, display, setDisplay);
  }
};

export const handleScientificFunction = (label, display, setDisplay) => {
  let currentValue = parseFloat(display);
  let result;

  switch (label) {
    case 'x²':
      result = Math.pow(currentValue, 2);
      break;
    // Handle other scientific functions...
    default:
      result = display;
  }

  setDisplay(result.toString());
};
