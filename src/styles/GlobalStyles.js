import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #2ecc71;
    --primary-dark: #27ae60;
    --primary-light: #eaffef;
    --secondary: #3498db;
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
    min-height: 100vh;
  }

  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Button Styles */
  .btn {
    display: inline-block;
    padding: 12px 24px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }

  .btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .btn-pulse {
    animation: pulse 2s infinite;
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.5);
  }

  .btn-secondary {
    background-color: white;
    color: var(--primary);
    border: 2px solid var(--primary);
    margin-left: 10px;
  }

  .btn-secondary:hover {
    background-color: var(--primary);
    color: white;
  }
`;