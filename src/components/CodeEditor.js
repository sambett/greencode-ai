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

const MetricsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
`;

const MetricCard = styled(motion.div)`
  flex: 1;
  background: radial-gradient(circle, var(--primary-light), white);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
`;

const MetricIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--primary);
  opacity: 0.3;
`;

const MetricTitle = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const MetricValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 5px;
`;

const MetricChange = styled.div`
  font-size: 14px;
  color: var(--success);
`;

const GaugeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  margin: 0 auto 15px;
`;

const GaugeValue = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

function CodeEditor() {
  const [code, setCode] = useState(`def calculate_values(data):\n    result = []\n    for item in data:\n        if item > 0:\n            result.append(item * 2)\n    total = 0\n    for r in result:\n        total += r\n    return result, total`);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [originalScore, setOriginalScore] = useState(60); // Mock initial GreenScore
  const [optimizedScore, setOptimizedScore] = useState(85); // Mock optimized GreenScore
  const [energySaved, setEnergySaved] = useState('2.8 J'); // Mock energy savings
  const [co2Saved, setCo2Saved] = useState('1.5 g'); // Mock CO₂ savings

  const handleOptimize = () => {
    setOptimizedCode(`def calculate_values(data):\n    result = [item * 2 for item in data if item > 0]\n    total = sum(result)\n    return result, total`);
    // Mock updates for metrics (replace with API later)
    setOptimizedScore(85);
    setEnergySaved('2.8 J');
    setCo2Saved('1.5 g');
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
      <MetricsPanel>
        <MetricCard whileHover={{ y: -5 }}>
          <MetricIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M14.83 9.17a4 4 0 1 1-4.83 4.83" />
              <path d="M12 6v2" />
              <path d="M16.24 7.76l-1.42 1.42" />
              <path d="M18 12h-2" />
            </svg>
          </MetricIcon>
          <MetricTitle>Original GreenScore™</MetricTitle>
          <GaugeContainer>
            <svg viewBox="0 0 200 100">
              <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#eee" strokeWidth="20" />
              <motion.path
                d="M20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#2ecc71"
                strokeWidth="20"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${originalScore} 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <path d="M100 20 C95 30 95 40 100 45 C105 40 105 30 100 20" fill="#2ecc71" />
            </svg>
            <GaugeValue>{originalScore}/100</GaugeValue>
          </GaugeContainer>
        </MetricCard>
        <MetricCard whileHover={{ y: -5 }}>
          <MetricIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M14.83 9.17a4 4 0 1 1-4.83 4.83" />
              <path d="M12 6v2" />
              <path d="M16.24 7.76l-1.42 1.42" />
              <path d="M18 12h-2" />
            </svg>
          </MetricIcon>
          <MetricTitle>Optimized GreenScore™</MetricTitle>
          <GaugeContainer>
            <svg viewBox="0 0 200 100">
              <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#eee" strokeWidth="20" />
              <motion.path
                d="M20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#2ecc71"
                strokeWidth="20"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${optimizedScore} 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <path d="M100 20 C95 30 95 40 100 45 C105 40 105 30 100 20" fill="#2ecc71" />
            </svg>
            <GaugeValue>{optimizedScore}/100</GaugeValue>
          </GaugeContainer>
        </MetricCard>
        <MetricCard whileHover={{ y: -5 }}>
          <MetricIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </MetricIcon>
          <MetricTitle>Energy Saved</MetricTitle>
          <MetricValue>{energySaved}</MetricValue>
        </MetricCard>
        <MetricCard whileHover={{ y: -5 }}>
          <MetricIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 22c1.25-1.67 2.83-3 5-4 1.7-1 3.33-1 5-1 1.67 0 3.3 0 5 1 2.17 1 3.75 2.33 5 4" />
              <path d="M12 2a8 8 0 0 1 8 8 12.34 12.34 0 0 1-.71 4.29" />
              <path d="M12 2a8 8 0 0 0-8 8c0 1.4.2 2.7.56 4" />
              <path d="M13.73 21a1.75 1.75 0 1 0-3.46 0" />
            </svg>
          </MetricIcon>
          <MetricTitle>CO₂ Saved</MetricTitle>
          <MetricValue>{co2Saved}</MetricValue>
        </MetricCard>
      </MetricsPanel>
    </EditorSection>
  );
}

export default CodeEditor;