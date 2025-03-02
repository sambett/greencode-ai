import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #2ecc71;
    --primary-dark: #27ae60;
    --dark: #2c3e50;
    --light: #ecf0f1;
    --warning: #e74c3c;
    --success: #27ae60;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: #f9f9f9;
    color: var(--dark);
  }

  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
`;