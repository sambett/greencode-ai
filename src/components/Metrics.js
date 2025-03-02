import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MetricsSection = styled(motion.section)`
  margin: 40px 0 60px;
  width: 100%;
`;

const MetricsTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 25px;
  text-align: left;
  position: relative;
  padding-left: 15px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 28px;
    background: linear-gradient(to bottom, var(--primary), var(--primary-dark));
    border-radius: 4px;
  }
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
  background: linear-gradient(135deg, #ffffff 0%, var(--primary-light) 100%);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(46, 204, 113, 0.15);
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    top: -150px;
    right: -150px;
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$variant === 'original' 
      ? 'linear-gradient(to right, #3498db, #2980b9)' 
      : 'linear-gradient(to right, var(--primary-dark), var(--primary))'};
    border-radius: 0 0 16px 16px;
  }
`;

const MetricIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${props => props.$variant === 'original' ? '#3498db' : 'var(--primary)'};
  opacity: 0.8;
  font-size: 28px;
  z-index: 1;
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 1;
`;

const MetricTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const MetricValue = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 15px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const MetricChange = styled.div`
  font-size: 15px;
  color: ${props => props.$type === 'decrease' ? '#e74c3c' : 'var(--success)'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: ${props => props.$type === 'decrease' 
    ? 'rgba(231, 76, 60, 0.1)' 
    : 'rgba(46, 204, 113, 0.1)'};
  border-radius: 12px;
  margin-top: 5px;
  font-weight: 500;
  
  .icon {
    font-size: 18px;
  }
`;

const GaugeContainer = styled.div`
  position: relative;
  width: 170px;
  height: 85px;
  margin: 0 auto 25px;
  
  .score-value {
    position: absolute;
    bottom: -5px;
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: 800;
    color: var(--dark);
  }
  
  .score-label {
    position: absolute;
    bottom: -30px;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: #777;
  }
`;

// Animated gauge paths and leaf icon for GreenScore metrics
const GreenScoreChart = ({ score, isOriginal, animate = true }) => {
  return (
    <GaugeContainer>
      <svg viewBox="0 0 200 100">
        {/* Background track */}
        <defs>
          <linearGradient id={isOriginal ? "blueGradient" : "greenGradient"} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isOriginal ? "#3498db" : "#2ecc71"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isOriginal ? "#2980b9" : "#27ae60"} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <path 
          d="M20 90 A 80 80 0 0 1 180 90" 
          fill="none" 
          stroke="#eee" 
          strokeWidth="18" 
          strokeLinecap="round"
        />
        
        {/* Animated score path */}
        <motion.path
          d="M20 90 A 80 80 0 0 1 180 90"
          fill="none"
          stroke={`url(#${isOriginal ? "blueGradient" : "greenGradient"})`}
          strokeWidth="18"
          strokeLinecap="round"
          initial={{ strokeDasharray: animate ? "0 380" : `${score * 3.8} 380` }}
          animate={{ strokeDasharray: `${score * 3.8} 380` }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        />
        
        {/* Actual score path */}
        <motion.path
          d="M20 90 A 80 80 0 0 1 180 90"
          fill="none"
          stroke={isOriginal ? "#3498db" : "#2ecc71"}
          strokeWidth="18"
          strokeDasharray={`${score * 3.8} 380`}
          strokeDashoffset="0"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.3 }}
        />
        
        {/* Leaf icon */}
        <motion.g
          initial={{ scale: 0, opacity: 0, translateX: 100, translateY: 15 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
        >
          <path 
            d="M0 0 Q 5 -10, 0 -20 Q -5 -10, 0 0" 
            fill={isOriginal ? "#3498db" : "#2ecc71"}
            transform="translate(100, 15) rotate(180)"
          />
          <rect 
            x="-1" 
            y="0" 
            width="2" 
            height="12" 
            fill={isOriginal ? "#3498db" : "#2ecc71"} 
            transform="translate(100, 15)"
          />
        </motion.g>
      </svg>
      <motion.div 
        className="score-value"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        {score}/100
      </motion.div>
    </GaugeContainer>
  );
};

// Energy Icon Component
const EnergyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path 
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
  </svg>
);

// CO2 Icon Component
const CO2Icon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path 
      d="M2 22c1.25-1.67 2.83-3 5-4 1.7-1 3.33-1 5-1 1.67 0 3.3 0 5 1 2.17 1 3.75 2.33 5 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    />
    <motion.path 
      d="M12 2a8 8 0 0 1 8 8 12.34 12.34 0 0 1-.71 4.29"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    />
    <motion.path 
      d="M12 2a8 8 0 0 0-8 8c0 1.4.2 2.7.56 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
    />
    <motion.path 
      d="M13.73 21a1.75 1.75 0 1 0-3.46 0"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
    />
  </svg>
);

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
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(46, 204, 113, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <MetricsSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MetricsTitle>Sustainability Metrics</MetricsTitle>
      
      <MetricsGrid>
        <MetricCard 
          $variant="original"
          variants={cardVariants}
          custom={0}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          whileHover="hover"
        >
          <MetricIcon $variant="original">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <motion.path 
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path 
                d="M14.83 9.17a4 4 0 1 1-4.83 4.83"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path 
                d="M12 6v2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              />
              <motion.path 
                d="M16.24 7.76l-1.42 1.42"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </svg>
          </MetricIcon>
          <MetricContent>
            <MetricTitle>Original GreenScore™</MetricTitle>
            <GreenScoreChart score={originalScore} isOriginal={true} />
          </MetricContent>
        </MetricCard>
        
        <MetricCard 
          variants={cardVariants}
          custom={1}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          whileHover="hover"
        >
          <MetricIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <motion.path 
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path 
                d="M14.83 9.17a4 4 0 1 1-4.83 4.83"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path 
                d="M12 6v2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              />
              <motion.path 
                d="M16.24 7.76l-1.42 1.42"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </svg>
          </MetricIcon>
          <MetricContent>
            <MetricTitle>Optimized GreenScore™</MetricTitle>
            <GreenScoreChart score={optimizedScore} isOriginal={false} />
            <MetricChange $type="increase">
              <span className="icon">↑</span> {improvement} points improvement
            </MetricChange>
          </MetricContent>
        </MetricCard>
        
        <MetricCard 
          variants={cardVariants}
          custom={2}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          whileHover="hover"
        >
          <MetricIcon>
            <EnergyIcon />
          </MetricIcon>
          <MetricContent>
            <MetricTitle>Energy Saved</MetricTitle>
            <MetricValue>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {energySaved} J
              </motion.span>
            </MetricValue>
            <MetricChange $type="decrease">
              <span className="icon">↓</span> 58% from original
            </MetricChange>
          </MetricContent>
        </MetricCard>
        
        <MetricCard 
          variants={cardVariants}
          custom={3}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          whileHover="hover"
        >
          <MetricIcon>
            <CO2Icon />
          </MetricIcon>
          <MetricContent>
            <MetricTitle>CO₂ Saved</MetricTitle>
            <MetricValue>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {co2Saved} g
              </motion.span>
            </MetricValue>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <MetricChange $type="neutral">
                This session
              </MetricChange>
            </motion.div>
          </MetricContent>
        </MetricCard>
      </MetricsGrid>
    </MetricsSection>
  );
}

export default Metrics;