import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HeroStyled = styled(motion.section)`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #f0fff4 0%, #ecf0f1 100%);
  border-radius: 12px;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232ecc71' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  h1 {
    font-size: 48px;
    margin-bottom: 15px;
    color: var(--dark);
    line-height: 1.2;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  p {
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 25px;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 30px 0;
`;

const MetricCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;

  .metric-title {
    color: #2c3e50;
    font-size: 14px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .metric-value {
    font-size: 24px;
    font-weight: bold;
    color: #2ecc71;
    margin-bottom: 4px;
  }

  .metric-subtitle {
    font-size: 12px;
    color: #95a5a6;
  }
`;

const GreenScoreCard = styled(MetricCard)`
  .score-gauge {
    width: 100px;
    height: 50px;
    margin: 0 auto 10px;
    position: relative;
    
    svg {
      transform: rotate(-90deg);
    }
  }

  .score-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    font-size: 20px;
    font-weight: bold;
    color: #2ecc71;
  }

  .score-change {
    color: #2ecc71;
    font-size: 14px;
  }
`;

const TipsSection = styled.div`
  margin-top: 40px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .tips-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 20px;
      color: #2c3e50;
    }

    .view-all {
      color: #2ecc71;
      text-decoration: none;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const TipCard = styled.div`
  padding: 16px;
  border: 1px solid #e1e8e3;
  border-radius: 8px;
  background: #f8faf9;

  .tip-title {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tip-description {
    font-size: 13px;
    color: #7f8c8d;
    line-height: 1.4;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  max-width: 45%;
  display: flex;
  justify-content: center;
`;

const MotionButton = styled(motion.div)`
  display: inline-block;
  margin-left: ${props => props.$isSecond ? '10px' : '0'};
`;

function Hero() {
  return (
    <AnimatePresence>
      <HeroStyled
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroContent>
          <motion.h1
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Code Green, Save Earth
          </motion.h1>
          <p>GreenCode AI is an intelligent assistant that analyzes your code, identifies energy-intensive patterns, and suggests more sustainable alternatives - without sacrificing performance.</p>
          
          <MetricsGrid>
            <GreenScoreCard>
              <div className="metric-title">GreenScore™</div>
              <div className="score-gauge">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e1e8e3"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#2ecc71"
                    strokeWidth="10"
                    strokeDasharray={`${2.827 * 85} ${2.827 * (100 - 85)}`}
                  />
                </svg>
                <div className="score-value">85/100</div>
              </div>
              <div className="score-change">+25 points</div>
            </GreenScoreCard>
            <MetricCard>
              <div className="metric-title">Energy Usage</div>
              <div className="metric-value">4.2J</div>
              <div className="metric-subtitle">-58% from original</div>
            </MetricCard>
            <MetricCard>
              <div className="metric-title">CO₂ Saved</div>
              <div className="metric-value">3.8g</div>
              <div className="metric-subtitle">This session</div>
            </MetricCard>
            <MetricCard>
              <div className="metric-title">Execution Time</div>
              <div className="metric-value">0.23s</div>
              <div className="metric-subtitle">-65% improvement</div>
            </MetricCard>
          </MetricsGrid>

          <TipsSection>
            <div className="tips-header">
              <h2>Sustainable Coding Tips</h2>
              <Link to="/tips" className="view-all">View All Tips</Link>
            </div>
            <TipsGrid>
              <TipCard>
                <div className="tip-title">
                  <span>🔄</span>
                  List Comprehensions {'>'} Loops
                </div>
                <div className="tip-description">
                  Python's list comprehensions are 20% more energy-efficient than loops.
                </div>
              </TipCard>
              <TipCard>
                <div className="tip-title">
                  <span>📝</span>
                  Minimize I/O Operations
                </div>
                <div className="tip-description">
                  Batch I/O to reduce energy use by up to 30%.
                </div>
              </TipCard>
              <TipCard>
                <div className="tip-title">
                  <span>⚡</span>
                  Use Built-In Functions
                </div>
                <div className="tip-description">
                  Optimized built-ins like 'map' save energy.
                </div>
              </TipCard>
            </TipsGrid>
          </TipsSection>

          <div>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/optimize" className="btn btn-pulse">
                Try GreenCode AI
              </Link>
            </MotionButton>
            <MotionButton
              $isSecond
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/docs" className="btn btn-secondary">
                Learn More
              </Link>
            </MotionButton>
          </div>
        </HeroContent>
        <HeroImage>
          <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="350" rx="10" fill="#f0fff4" />
            <rect x="100" y="50" width="300" height="200" rx="5" fill="#2c3e50" />
            <rect x="110" y="60" width="280" height="170" rx="2" fill="#34495e" />
            <rect x="125" y="80" width="250" height="10" rx="2" fill="#2ecc71" opacity="0.7" />
            <rect x="125" y="100" width="200" height="10" rx="2" fill="#ecf0f1" opacity="0.5" />
            <rect x="125" y="120" width="220" height="10" rx="2" fill="#ecf0f1" opacity="0.5" />
            <rect x="125" y="140" width="180" height="10" rx="2" fill="#e74c3c" opacity="0.7" />
            <rect x="125" y="160" width="250" height="10" rx="2" fill="#ecf0f1" opacity="0.5" />
            <rect x="125" y="180" width="150" height="10" rx="2" fill="#2ecc71" opacity="0.7" />
            <rect x="220" y="250" width="60" height="10" rx="2" fill="#7f8c8d" />
            <rect x="235" y="260" width="30" height="20" rx="2" fill="#7f8c8d" />
            <ellipse cx="250" cy="290" rx="50" ry="10" fill="#bdc3c7" opacity="0.5" />
            <path d="M370 130 C 380 80, 430 80, 440 130" stroke="#2ecc71" strokeWidth="3" fill="none" />
            <path d="M380 120 C 390 80, 420 80, 430 120" stroke="#2ecc71" strokeWidth="3" fill="none" />
            <path d="M390 110 C 400 80, 410 80, 420 110" stroke="#2ecc71" strokeWidth="3" fill="none" />
            <path d="M60 110 Q 90 70, 80 130 Q 50 90, 60 110" fill="#2ecc71" />
            <path d="M50 180 Q 80 140, 70 200 Q 40 160, 50 180" fill="#2ecc71" />
            <circle cx="420" cy="200" r="30" fill="#f39c12" opacity="0.8" />
            <text x="420" y="207" fontSize="18" textAnchor="middle" fill="white">CO₂</text>
            <line x1="385" y1="200" x2="455" y2="200" stroke="#e74c3c" strokeWidth="3" />
          </svg>
        </HeroImage>
      </HeroStyled>
    </AnimatePresence>
  );
}

export default Hero;
