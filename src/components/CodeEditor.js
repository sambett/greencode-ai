import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EditorSection = styled.section`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 40px;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  h2 {
    font-size: 24px;
    color: var(--dark);
  }
`;

const EditorControls = styled.div`
  display: flex;
  gap: 10px;
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
`;

const EditorsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const EditorWrapper = styled.div`
  flex: 1;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  position: relative;
`;

const EditorLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
`;

const EditorActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

function CodeEditor() {
  const [code, setCode] = useState(`def calculate_values(data):\n    result = []\n    for item in data:\n        if item > 0:\n            result.append(item * 2)\n    total = 0\n    for r in result:\n        total += r\n    return result, total`);
  const [optimizedCode, setOptimizedCode] = useState('');

  const handleOptimize = () => {
    setOptimizedCode(`def calculate_values(data):\n    result = [item * 2 for item in data if item > 0]\n    total = sum(result)\n    return result, total`);
  };

  return (
    <EditorSection as={motion.section} initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <EditorHeader>
        <h2>Optimize Your Code</h2>
        <EditorControls>
          <Dropdown>
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
          </Dropdown>
        </EditorControls>
      </EditorHeader>
      <EditorsContainer>
        <EditorWrapper>
          <EditorLabel>Your Code</EditorLabel>
          <MonacoEditor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
          />
        </EditorWrapper>
        <EditorWrapper>
          <EditorLabel>Optimized Code</EditorLabel>
          <MonacoEditor
            height="100%"
            defaultLanguage="python"
            value={optimizedCode}
            theme="vs-dark"
            options={{ readOnly: true }}
          />
        </EditorWrapper>
      </EditorsContainer>
      <EditorActions>
        <motion.button className="btn" onClick={handleOptimize} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Optimize Code
        </motion.button>
      </EditorActions>
    </EditorSection>
  );
}

export default CodeEditor;