import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroStyled = styled.section`
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

const HeroImage = styled.div`
  flex: 1;
  max-width: 45%;
  display: flex;
  justify-content: center;
`;

function Hero() {
  return (
    <HeroStyled as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <HeroContent>
        <motion.h1 initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.6 }}>
          Code Green, Save Earth
        </motion.h1>
        <p>GreenCode AI is an intelligent assistant that analyzes your code, identifies energy-intensive patterns, and suggests more sustainable alternatives - without sacrificing performance.</p>
        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/optimize" className="btn btn-pulse">
              Try GreenCode AI
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block', marginLeft: '10px' }}>
            <Link to="/docs" className="btn btn-secondary">
              Learn More
            </Link>
          </motion.div>
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
          <text x="250" y="320" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#2c3e50">Green Code AI</text>
          <text x="250" y="340" fontSize="12" textAnchor="middle" fill="#7f8c8d">Sustainable Coding for a Better Future</text>
        </svg>
      </HeroImage>
    </HeroStyled>
  );
}

export default Hero;