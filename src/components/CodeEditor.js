import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EditorSection = styled(motion.section)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 30px;
  margin: 20px 0 40px 0;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  
  h2 {
    font-size: 28px;
    color: var(--dark);
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    
    h2 {
      font-size: 24px;
    }
  }
`;

const EditorControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Dropdown = styled.select`
  padding: 10px 15px;
  border-radius: var(--border-radius-sm);
  border: 1px solid #ddd;
  background-color: white;
  font-family: 'Poppins', sans-serif;
  color: var(--dark);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
  }
`;

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const EditorWrapper = styled.div`
  height: 500px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #ccc;
  }
`;

const EditorLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  border-radius: var(--border-radius-sm);
  font-size: 14px;
  font-weight: 600;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--dark);
`;

const EditorActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  
  .optimize-btn {
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 600;
  }
`;

function CodeEditor() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`def calculate_values(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    total = 0
    for r in result:
        total += r
    return result, total`);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    
    // Set sample code based on language
    if (e.target.value === 'javascript') {
      setCode(`function calculateValues(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0) {
      result.push(data[i] * 2);
    }
  }
  let total = 0;
  for (let j = 0; j < result.length; j++) {
    total += result[j];
  }
  return [result, total];
}`);
      setOptimizedCode('');
    } else if (e.target.value === 'python') {
      setCode(`def calculate_values(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    total = 0
    for r in result:
        total += r
    return result, total`);
      setOptimizedCode('');
    } else if (e.target.value === 'java') {
      setCode(`public class Calculator {
    public static Object[] calculateValues(int[] data) {
        List<Integer> result = new ArrayList<>();
        for (int item : data) {
            if (item > 0) {
                result.add(item * 2);
            }
        }
        int total = 0;
        for (int r : result) {
            total += r;
        }
        return new Object[]{result, total};
    }
}`);
      setOptimizedCode('');
    } else if (e.target.value === 'cpp') {
      setCode(`std::pair<std::vector<int>, int> calculateValues(const std::vector<int>& data) {
    std::vector<int> result;
    for (const auto& item : data) {
        if (item > 0) {
            result.push_back(item * 2);
        }
    }
    int total = 0;
    for (const auto& r : result) {
        total += r;
    }
    return {result, total};
}`);
      setOptimizedCode('');
    }
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (language === 'javascript') {
        setOptimizedCode(`function calculateValues(data) {
  const result = data
    .filter(item => item > 0)
    .map(item => item * 2);
  
  const total = result.reduce((sum, item) => sum + item, 0);
  return [result, total];
}`);
      } else if (language === 'python') {
        setOptimizedCode(`def calculate_values(data):
    result = [item * 2 for item in data if item > 0]
    total = sum(result)
    return result, total`);
      } else if (language === 'java') {
        setOptimizedCode(`public class Calculator {
    public static Object[] calculateValues(int[] data) {
        List<Integer> result = Arrays.stream(data)
            .filter(item -> item > 0)
            .map(item -> item * 2)
            .boxed()
            .collect(Collectors.toList());
        
        int total = result.stream().mapToInt(Integer::intValue).sum();
        return new Object[]{result, total};
    }
}`);
      } else if (language === 'cpp') {
        setOptimizedCode(`std::pair<std::vector<int>, int> calculateValues(const std::vector<int>& data) {
    std::vector<int> result;
    result.reserve(data.size());
    
    std::copy_if(data.begin(), data.end(), 
                 std::back_inserter(result),
                 [](int i) { return i > 0; });
    
    std::transform(result.begin(), result.end(), 
                   result.begin(),
                   [](int i) { return i * 2; });
    
    int total = std::accumulate(result.begin(), result.end(), 0);
    return {result, total};
}`);
      }
      
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <EditorSection
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <EditorHeader>
        <h2>Optimize Your Code</h2>
        <EditorControls>
          <label htmlFor="language-select">Language:</label>
          <Dropdown 
            id="language-select"
            value={language} 
            onChange={handleLanguageChange}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </Dropdown>
        </EditorControls>
      </EditorHeader>
      
      <EditorContainer>
        <EditorWrapper>
          <EditorLabel>Your Code</EditorLabel>
          <MonacoEditor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true
            }}
          />
        </EditorWrapper>
        
        <EditorWrapper>
          <EditorLabel>Optimized Code</EditorLabel>
          <MonacoEditor
            height="100%"
            language={language}
            value={optimizedCode}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              readOnly: true,
              automaticLayout: true
            }}
          />
        </EditorWrapper>
      </EditorContainer>
      
      <EditorActions>
        <motion.button
          className="btn optimize-btn"
          onClick={handleOptimize}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(46, 204, 113, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          animate={isOptimizing ? { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
          disabled={isOptimizing}
        >
          {isOptimizing ? "Optimizing..." : "Optimize Code"}
        </motion.button>
      </EditorActions>
    </EditorSection>
  );
}

export default CodeEditor;