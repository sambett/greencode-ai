import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled(motion.section)`
  display: flex;
  gap: 40px;
  align-items: center;
  margin: 20px 0 60px 0;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--background) 100%);
  border-radius: var(--border-radius);
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--card-shadow);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }

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
    font-size: 54px;
    margin-bottom: 25px;
    color: var(--dark);
    line-height: 1.2;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
      font-size: 36px;
      text-align: center;
    }
  }
  
  p {
    font-size: 18px;
    line-height: 1.7;
    color: #555;
    margin-bottom: 35px;
    max-width: 90%;
    
    @media (max-width: 768px) {
      font-size: 16px;
      text-align: center;
      max-width: 100%;
    }
  }
  
  .hero-buttons {
    display: flex;
    gap: 15px;
    
    @media (max-width: 768px) {
      justify-content: center;
      flex-wrap: wrap;
    }
  }
`;

const HeroImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-top: 30px;
    width: 100%;
  }
  
  svg {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 10px 20px rgba(46, 204, 113, 0.2));
  }
`;

const gradientVariants = {
  animate: {
    background: [
      "linear-gradient(135deg, #eaffef 0%, #f9f9f9 100%)",
      "linear-gradient(135deg, #f0fff4 0%, #f9f9f9 100%)",
      "linear-gradient(135deg, #eaffef 0%, #f9f9f9 100%)"
    ],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const codeLineVariants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5 + (i * 0.1)
    }
  }),
};

function Hero() {
  return (
    <HeroSection
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        ...gradientVariants.animate 
      }}
      transition={{ duration: 0.8 }}
    >
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Code Green, Save Earth
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          GreenCode AI is an intelligent assistant that analyzes your code, identifies energy-intensive patterns, and suggests more sustainable alternatives - without sacrificing performance.
        </motion.p>
        
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/optimize" className="btn btn-pulse">
              Try GreenCode AI
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/docs" className="btn btn-secondary">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </HeroContent>
      
      <HeroImageContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
          {/* Monitor and Frame */}
          <motion.rect 
            width="380" height="250" x="60" y="30" rx="10" 
            fill="#2c3e50" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.rect 
            width="350" height="200" x="75" y="50" rx="5" 
            fill="#34495e"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
          
          {/* Stand */}
          <motion.path
            d="M220 280 L280 280 L270 330 L230 330 Z"
            fill="#2c3e50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
          <motion.ellipse 
            cx="250" cy="330" rx="60" ry="10" 
            fill="#2c3e50" 
            opacity="0.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />
          
          {/* Code Lines */}
          <motion.rect 
            custom={0}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="250" height="10" x="95" y="70" rx="2" 
            fill="#2ecc71" opacity="0.9" 
          />
          <motion.rect 
            custom={1}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="200" height="10" x="95" y="90" rx="2" 
            fill="#ecf0f1" opacity="0.5" 
          />
          <motion.rect 
            custom={2}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="230" height="10" x="95" y="110" rx="2" 
            fill="#ecf0f1" opacity="0.5" 
          />
          <motion.rect 
            custom={3}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="180" height="10" x="95" y="130" rx="2" 
            fill="#e74c3c" opacity="0.7" 
          />
          <motion.rect 
            custom={4}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="250" height="10" x="95" y="150" rx="2" 
            fill="#ecf0f1" opacity="0.5" 
          />
          <motion.rect 
            custom={5}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="150" height="10" x="95" y="170" rx="2" 
            fill="#2ecc71" opacity="0.9" 
          />
          <motion.rect 
            custom={6}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="200" height="10" x="95" y="190" rx="2" 
            fill="#ecf0f1" opacity="0.5" 
          />
          <motion.rect 
            custom={7}
            variants={codeLineVariants}
            initial="initial"
            animate="animate"
            width="230" height="10" x="95" y="210" rx="2" 
            fill="#ecf0f1" opacity="0.5" 
          />
          
          {/* Green Energy Elements */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {/* Leaf */}
            <path d="M60 110 Q 90 70, 80 130 Q 50 90, 60 110" fill="#2ecc71" />
            <path d="M50 180 Q 80 140, 70 200 Q 40 160, 50 180" fill="#2ecc71" />
            
            {/* Green Energy Waves */}
            <path d="M370 130 C 380 80, 430 80, 440 130" stroke="#2ecc71" strokeWidth="3" fill="none" />
            <path d="M380 120 C 390 80, 420 80, 430 120" stroke="#2ecc71" strokeWidth="3" fill="none" />
            <path d="M390 110 C 400 80, 410 80, 420 110" stroke="#2ecc71" strokeWidth="3" fill="none" />
            
            {/* CO2 Reduction Symbol */}
            <motion.g
              initial={{ y: 10 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              <circle cx="420" cy="200" r="30" fill="#f39c12" opacity="0.8" />
              <text x="420" y="207" fontSize="18" textAnchor="middle" fill="white">CO₂</text>
              <line x1="385" y1="200" x2="455" y2="200" stroke="#e74c3c" strokeWidth="3" />
            </motion.g>
          </motion.g>
        </svg>
      </HeroImageContainer>
    </HeroSection>
  );
}

export default Hero;