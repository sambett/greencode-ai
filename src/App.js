import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CodeEditor from './components/CodeEditor';
import Metrics from './components/Metrics';
import Tips from './components/Tips';
import Footer from './components/Footer';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <div className="app-container">
      <GlobalStyles />
      <Header />
      <Hero />
      <CodeEditor />
      <Metrics />
      <Tips />
      <Footer />
    </div>
  );
}

export default App;