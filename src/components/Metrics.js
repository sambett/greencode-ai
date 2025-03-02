import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MetricsSection = styled(motion.section)`
  margin: 40px 0;
  width: 100%;
`;

const MetricsTitle = styled.h2`
  font-size: 24px;
  color: var(--dark);
  margin-bottom: 20px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled(motion.div)`
  background: radial-gradient(circle at top right, var(--primary-light), white);
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.1);
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(to right, var(--primary-dark), var(--primary));
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
`;

const MetricIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  color: var(--primary);
  opacity: 0.3;
  font-size: 24px;
`;

const MetricTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin-bottom: 15px;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 10px;
  text-align: center;
`;

const MetricChange = styled.div`
  font-size: 14px;
  color: var(--success);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
  .icon {
    font-size: 18px;
  }
`;

const GaugeContainer = styled.div`
  position: relative;
  width: 150px;
  height: 75px;
  margin: 0 auto 15px;
  
  .score-value {
    position: absolute;
    bottom: -10px;
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: var(--dark);
  }
`;

// Animated gauge paths and leaf icon for GreenScore metrics
const GreenScoreChart = ({ score, isOriginal }) => {
  return (
    <GaugeContainer>
      <svg viewBox="0 0 200 100">
        {/* Background track */}
        <path 
          d="M20 90 A 80 80 0 0 1 180 90" 
          fill="none" 
          stroke="#eee" 
          strokeWidth="20" 
          strokeLinecap="round"
        />
        
        {/* Animated score path */}
        <motion.path
          d="M20 90 A 80 80 0 0 1 180 90"
          fill="none"
          stroke={isOriginal ? "#3498db" : "#2ecc71"}
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ strokeDasharray: "0 380" }}
          animate={{ strokeDasharray: `${score * 3.8} 380` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        
        {/* Leaf icon */}
        <motion.path 
          d="M100 20 C95 30 95 40 100 45 C105 40 105 30 100 20" 
          fill={isOriginal ? "#3498db" : "#2ecc71"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />
      </svg>
      <motion.div 
        className="score-value"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {score}/100
      </motion.div>
    </GaugeContainer>
  );
};

function Metrics() {
  const [originalScore, setOriginalScore] = useState(60);
  const [optimizedScore, setOptimizedScore] = useState(85);
  const [energySaved, setEnergySaved] = useState("2.8");
  const [co2Saved, setCo2Saved] = useState("1.5");
  const [improvement, setImprovement] = useState(25);
  const [visible, setVisible] = useState(false);
  
  // Simulate the metrics being updated after optimization
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <MetricsSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MetricsTitle>Sustainability Metrics</MetricsTitle>
      
      <MetricsGrid>
        <MetricCard 
          whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(46, 204, 113, 0.15)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MetricIcon>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M14.83 9.17a4 4 0 1 1-4.83 4.83" />
              <path d="M12 6v2" />
              <path d="M16.24 7.76l-1.42 1.42" />
              <path d="M18 12h-2" />
            </svg>
          </MetricIcon>
          <MetricTitle>Original GreenScore™</MetricTitle>
          <GreenScoreChart score={originalScore} isOriginal={true} />
        </MetricCard>
        
        <MetricCard 
          whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(46, 204, 113, 0.15)" }}
          initial={{ opacity: 0, x: 20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MetricIcon>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M14.83 9.17a4 4 0 1 1-4.83 4.83" />
              <path d="M12 6v2" />
              <path d="M16.24 7.76l-1.42 1.42" />
              <path d="M18 12h-2" />
            </svg>
          </MetricIcon>
          <MetricTitle>Optimized GreenScore™</MetricTitle>
          <GreenScoreChart score={optimizedScore} isOriginal={false} />
          <MetricChange>
            <span className="icon">↑</span> {improvement} points improvement
          </MetricChange>
        </MetricCard>
        
        <MetricCard 
          whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(46, 204, 113, 0.15)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MetricIcon>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </MetricIcon>
          <MetricTitle>Energy Saved</MetricTitle>
          <MetricValue>
            <motion.span
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {energySaved} J
            </motion.span>
          </MetricValue>
          <MetricChange>
            <span className="icon">↓</span> 58% from original
          </MetricChange>
        </MetricCard>
        
        <MetricCard 
          whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(46, 204, 113, 0.15)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MetricIcon>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 22c1.25-1.67 2.83-3 5-4 1.7-1 3.33-1 5-1 1.67 0 3.3 0 5 1 2.17 1 3.75 2.33 5 4" />
              <path d="M12 2a8 8 0 0 1 8 8 12.34 12.34 0 0 1-.71 4.29" />
              <path d="M12 2a8 8 0 0 0-8 8c0 1.4.2 2.7.56 4" />
              <path d="M13.73 21a1.75 1.75 0 1 0-3.46 0" />
            </svg>
          </MetricIcon>
          <MetricTitle>CO₂ Saved</MetricTitle>
          <MetricValue>
            <motion.span
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {co2Saved} g
            </motion.span>
          </MetricValue>
          <MetricChange>
            This session
          </MetricChange>
        </MetricCard>
      </MetricsGrid>
    </MetricsSection>
  );
}

export default Metrics;