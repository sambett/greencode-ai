import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CodeEditor from './components/CodeEditor';
import Metrics from './components/Metrics';
import Tips from './components/Tips';
import Footer from './components/Footer';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <Router>
      <div className="app-container">
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/optimize" element={
            <>
              <CodeEditor />
              <Metrics />
              <Tips />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;