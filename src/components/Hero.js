import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroStyled = styled.section`
  background: linear-gradient(135deg, #f0fff4, #ecf0f1);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

function Hero() {
  return (
    <HeroStyled as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1>Code Green, Save Earth</h1>
      <p>Optimize your code for sustainability.</p>
      <Button whileHover={{ scale: 1.05 }}>Try Now</Button>
    </HeroStyled>
  );
}

export default Hero;