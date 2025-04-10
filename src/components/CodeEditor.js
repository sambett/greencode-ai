import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Import API service
import { analyzeCode } from '../services/api';
import config from '../config';

const ImprovedOptimizedCodeBlock = ({ code, state, onOptimize }) => {
  const formatCode = (code) => {
    if (!code) return [];
    
    return code.split('\n').map((line, index) => {
      const indentMatch = line.match(/^(\s+)/);
      const indentClass = indentMatch 
        ? `indent-${Math.floor(indentMatch[0].length / 4)}` 
        : '';
      
      // Simple syntax highlighting
      const highlightedLine = line
        .replace(/def\s+([a-zA-Z0-9_]+)/g, '<span class="keyword">def</span> <span class="function">$1</span>')
        .replace(/return\s+/g, '<span class="keyword">return</span> ')
        .replace(/if\s+/g, '<span class="keyword">if</span> ')
        .replace(/for\s+/g, '<span class="keyword">for</span> ')
        .replace(/in\s+/g, '<span class="keyword">in</span> ')
        .replace(/sum\(/g, '<span class="function">sum</span>(')
        .replace(/\[\s*([^\]]*)\s*\]/g, '[<span class="value">$1</span>]');
      
      return (
        <div 
          key={index} 
          className={`code-line ${indentClass}`}
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      );
    });
  };
  
  // Function to render placeholder content
  const renderPlaceholderContent = () => {
    if (state === 'initial') {
      return (
        <motion.div 
          className="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="placeholder-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
              <path d="M7 17c0-3 2-5 8-5s8 2 8 5a3 3 0 0 1-3 3c-2.8 0-5-1.8-5-4" />
              <path d="M16 10c0 2.8-4 5-4-1-1 0-4 1-4 3-1 .5-2 1-2 2" />
              <path d="M12 19c-2 0-4.5-1-8-5 2 0 3 .5 4 2 2 0 3 1 4 3Z" />
            </svg>
          </div>
          <p>Click <span className="highlight">'Optimize Code'</span> to see your optimized code here!</p>
          <div className="placeholder-grid"></div>
        </motion.div>
      );
    } else if (state === 'loading') {
      return (
        <motion.div 
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="spinner"></div>
          <p>Optimizing your code for sustainability...</p>
          <div className="progress-bar">
            <motion.div 
              className="progress"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8 }}
            ></motion.div>
          </div>
        </motion.div>
      );
    }
    return null;
  };
  
  return (
    <div className="optimized-editor-wrapper">
      <div className="editor-label">Optimized Code</div>
      
      {state !== 'complete' ? (
        <div className="placeholder-container">
          {renderPlaceholderContent()}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="code-editor"
        >
          <pre>
            {formatCode(code)}
          </pre>
          <div className="optimization-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>85% More Efficient</span>
          </div>
        </motion.div>
      )}
      
      {/* Styling for the component */}
      <style jsx>{`
        .optimized-editor-wrapper {
          height: 500px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #4CAF50;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          position: relative;
          transition: all 0.3s ease;
          background-color: #1e293b; /* Dark blue shade instead of black */
        }
        
        .optimized-editor-wrapper:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .editor-label {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          color: #2c3e50;
        }
        
        .placeholder-container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 20px;
        }
        
        .placeholder, .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 300px;
        }
        
        .placeholder p, .loading p {
          color: rgba(255, 255, 255, 0.7);
          margin: 15px 0;
          font-size: 16px;
          line-height: 1.5;
        }
        
        .highlight {
          color: #4CAF50;
          font-weight: 600;
        }
        
        .placeholder-icon {
          margin-bottom: 10px;
          opacity: 0.8;
        }
        
        .placeholder-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center center;
          z-index: -1;
          opacity: 0.5;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(76, 175, 80, 0.3);
          border-radius: 50%;
          border-top-color: #4CAF50;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 15px;
        }
        
        .progress {
          height: 100%;
          background: linear-gradient(to right, #4CAF50, #2E7D32);
          border-radius: 3px;
        }
        
        .code-editor {
          height: 100%;
          position: relative;
          overflow: auto;
          font-family: 'Courier New', monospace;
          padding: 40px 15px 15px 15px;
          scrollbar-width: thin;
          scrollbar-color: rgba(76, 175, 80, 0.5) rgba(30, 41, 59, 0.1);
        }
        
        /* Custom scrollbar for Webkit browsers */
        .code-editor::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .code-editor::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.1);
          border-radius: 4px;
        }
        
        .code-editor::-webkit-scrollbar-thumb {
          background-color: rgba(76, 175, 80, 0.5);
          border-radius: 4px;
        }
        
        pre {
          margin: 0;
          color: #e0e0e0;
          font-size: 14px;
        }
        
        .code-line {
          line-height: 1.5;
          white-space: pre;
        }
        
        .indent-0 { padding-left: 0; }
        .indent-1 { padding-left: 20px; }
        .indent-2 { padding-left: 40px; }
        .indent-3 { padding-left: 60px; }
        
        .keyword { color: #569CD6; }
        .function { color: #DCDCAA; }
        .value { color: #CE9178; }
        .comment { color: #6A9955; }
        
        .optimization-badge {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background-color: rgba(76, 175, 80, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

// This would be your real component using the improved optimized code block
const CodeEditorWithImprovedOptimization = () => {
  const [userCode, setUserCode] = useState(`def calculate_values(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    total = 0
    for r in result:
        total += r
    return result, total`);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationState, setOptimizationState] = useState('initial');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleCodeChange = (e) => {
    setUserCode(e.target.value);
  };
  
  const handleOptimize = async () => {
    setIsOptimizing(true);
    setOptimizationState('loading');
    setErrorMessage('');
    
    try {
      // Call the API service
      const result = await analyzeCode(userCode);
      
      // Update state with results
      setOptimizedCode(result.optimized_code);
      
      // Dispatch event for metrics component to listen for
      window.dispatchEvent(new CustomEvent('codeOptimized', { 
        detail: result 
      }));
      
      setOptimizationState('complete');
    } catch (error) {
      console.error('Error optimizing code:', error);
      setErrorMessage(`Failed to optimize code: ${error.message}`);
      setOptimizationState('initial');
    } finally {
      setIsOptimizing(false);
    }
  };
  
  return (
    <div className="editor-section">
      <h2>Optimize Your Code</h2>
      
      {errorMessage && (
        <div className="error-message">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')}>✕</button>
        </div>
      )}
      
      <div className="editor-container">
        <div className="editor-wrapper">
          <div className="editor-label">Your Code</div>
          <div className="code-editor">
            <textarea
              value={userCode}
              onChange={handleCodeChange}
              placeholder="Enter your Python code here..."
              className="code-input"
            />
          </div>
        </div>
        
        <ImprovedOptimizedCodeBlock 
          code={optimizedCode}
          state={optimizationState}
        />
      </div>
      
      <div className="editor-actions">
        <motion.button
          className="optimize-btn"
          onClick={handleOptimize}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(46, 204, 113, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          animate={isOptimizing ? { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
          disabled={isOptimizing}
        >
          {isOptimizing ? "Optimizing..." : "Optimize Code"}
        </motion.button>
      </div>
      
      <style jsx>{`
        .editor-section {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 30px;
          margin: 20px 0 40px 0;
        }
        
        h2 {
          font-size: 28px;
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 25px;
        }
        
        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .error-message button {
          background: none;
          border: none;
          color: #c62828;
          cursor: pointer;
          font-size: 16px;
        }
        
        .editor-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 30px;
        }
        
        .editor-wrapper {
          height: 500px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          position: relative;
          transition: all 0.3s ease;
          background-color: #1e293b; /* Dark blue shade instead of black */
        }
        
        .editor-wrapper:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .editor-label {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          color: #2c3e50;
        }
        
        .code-editor {
          height: 100%;
          position: relative;
          overflow: auto;
          font-family: 'Courier New', monospace;
          padding: 40px 15px 15px 15px;
        }
        
        .code-input {
          width: 100%;
          height: 100%;
          background-color: transparent;
          border: none;
          color: #e0e0e0;
          font-size: 14px;
          font-family: 'Courier New', monospace;
          resize: none;
          outline: none;
          padding: 0;
        }
        
        .editor-actions {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }
        
        .optimize-btn {
          padding: 12px 30px;
          font-size: 16px;
          font-weight: 600;
          background-color: #2ecc71;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
        }
        
        .optimize-btn:hover {
          background-color: #27ae60;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(46, 204, 113, 0.3);
        }
        
        .optimize-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default CodeEditorWithImprovedOptimization;