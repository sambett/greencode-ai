import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MetricsPanel = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const MetricCard = styled(motion.div)`
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

function Metrics() {
  return (
    <MetricsPanel>
      <MetricCard whileHover={{ y: -5 }}>
        <div className="metric-title">GreenScore™</div>
        <div className="metric-value">85/100</div>
      </MetricCard>
      <MetricCard whileHover={{ y: -5 }}>
        <div className="metric-title">Energy Saved</div>
        <div className="metric-value">4.2 J</div>
      </MetricCard>
    </MetricsPanel>
  );
}

export default Metrics;