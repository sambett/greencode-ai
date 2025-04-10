import React from 'react';
import { motion } from 'framer-motion';
import { formatCodeForDisplay } from '../../utils/editorConfig';

/**
 * Component to display code with syntax highlighting
 */
const CodeDisplay = ({ code, badges = [], actions = [] }) => {
  const formattedLines = formatCodeForDisplay(code);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="code-editor"
    >
      <pre>
        {formattedLines.map(line => (
          <div 
            key={line.key} 
            className={line.className}
            dangerouslySetInnerHTML={{ __html: line.html }}
          />
        ))}
      </pre>
      
      {/* Render badges if any */}
      {badges.map((badge, index) => (
        <div key={index} className={`${badge.className || 'optimization-badge'}`}>
          {badge.icon}
          <span>{badge.text}</span>
        </div>
      ))}
      
      {/* Render action buttons if any */}
      {actions.map((action, index) => (
        <motion.button
          key={index}
          className={action.className || 'comparison-btn'}
          onClick={action.onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action.icon}
          {action.text}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CodeDisplay;