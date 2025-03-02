import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styled from 'styled-components';

const EditorSection = styled.section`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const EditorsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const EditorWrapper = styled.div`
  flex: 1;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
`;

function CodeEditor() {
  const [code, setCode] = useState(`for (let i = 0; i < array.length; i++) {
  result.push(array[i] * 2);
}`);
  const [optimizedCode, setOptimizedCode] = useState('');

  const handleOptimize = () => {
    setOptimizedCode(`const result = array.map(item => item * 2);`);
  };

  return (
    <EditorSection>
      <h2>Optimize Your Code</h2>
      <EditorsContainer>
        <EditorWrapper>
          <MonacoEditor
            height="200px"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
          />
        </EditorWrapper>
        <EditorWrapper>
          <MonacoEditor
            height="200px"
            defaultLanguage="javascript"
            value={optimizedCode}
            theme="vs-dark"
            options={{ readOnly: true }}
          />
        </EditorWrapper>
      </EditorsContainer>
      <Button onClick={handleOptimize}>Optimize</Button>
    </EditorSection>
  );
}

export default CodeEditor;