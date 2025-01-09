import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './components/Calculator/Theme'; // Adjust the path if necessary
import Calculator from './components/Calculator/Calculator';
import { GlobalStyle } from './components/Calculator/GlobalStyle'; // Adjust the path if necessary

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode as default

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Calculator />
    </ThemeProvider>
  );
};

export default App;