import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TipsSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 40px;
`;

const TipsContent = styled.div`
  display: flex;
  gap: 20px;
`;

const TipCard = styled(motion.div)`
  flex: 1;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid var(--primary);
`;

function Tips() {
  return (
    <TipsSection>
      <h2>Sustainable Coding Tips</h2>
      <TipsContent>
        <TipCard whileHover={{ y: -5 }}>
          <div className="tip-title">Use Map Over Loops</div>
          <p>Faster and more energy-efficient.</p>
        </TipCard>
        <TipCard whileHover={{ y: -5 }}>
          <div className="tip-title">Batch I/O</div>
          <p>Reduces energy use significantly.</p>
        </TipCard>
      </TipsContent>
    </TipsSection>
  );
}

export default Tips;