import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TipsSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TipsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    font-size: 24px;
  }
`;

const TipsContent = styled.div`
  display: flex;
  gap: 20px;
`;

const TipCard = styled(motion.div)`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--primary);
`;

const TipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: var(--primary-light);
  border-radius: 50%;
  margin-right: 8px;
  color: var(--primary);
`;

const TipTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--dark);
`;

const TipBody = styled.p`
  color: #555;
  line-height: 1.5;
`;

function Tips() {
  return (
    <TipsSection>
      <TipsHeader>
        <h2>Sustainable Coding Tips</h2>
        <a href="#" className="btn btn-secondary">
          View All Tips
        </a>
      </TipsHeader>
      <TipsContent>
        <TipCard whileHover={{ y: -5 }}>
          <TipTitle>
            <TipIcon>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </TipIcon>
            List Comprehensions {'>'} Loops
          </TipTitle>
          <TipBody>Python's list comprehensions are 20% more energy-efficient than loops.</TipBody>
        </TipCard>
        <TipCard whileHover={{ y: -5 }}>
          <TipTitle>
            <TipIcon>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </TipIcon>
            Minimize I/O Operations
          </TipTitle>
          <TipBody>Batch I/O to reduce energy use by up to 30%.</TipBody>
        </TipCard>
        <TipCard whileHover={{ y: -5 }}>
          <TipTitle>
            <TipIcon>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m8 22 4-10 4 10" />
              </svg>
            </TipIcon>
            Use Built-in Functions
          </TipTitle>
          <TipBody>Optimized built-ins like 'map' save energy.</TipBody>
        </TipCard>
      </TipsContent>
    </TipsSection>
  );
}

export default Tips;