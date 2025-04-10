import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeDisplay from './CodeDisplay';

/**
 * Component for comparing different optimization variants
 */
const DetailedComparison = ({ 
  isVisible, 
  onClose, 
  variants = {},
  originalCode,
  optimization 
}) => {
  if (!isVisible) return null;
  
  const { fast_version, green_version } = variants;
  
  // Animation variants for the modal
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-header">
              <h3>Code Variant Comparison</h3>
              <button className="close-button" onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="comparison-content">
              <div className="comparison-section">
                <h4>Original Code</h4>
                <div className="code-container original">
                  <CodeDisplay code={originalCode} />
                </div>
              </div>
              
              <div className="comparison-grid">
                <div className="comparison-section">
                  <h4>
                    <span className="variant-icon speed">🚀</span>
                    Speed Optimized
                  </h4>
                  <div className="code-container speed">
                    <CodeDisplay 
                      code={fast_version?.code || ''} 
                      badges={[
                        {
                          icon: <span>⏱️</span>,
                          text: `${fast_version?.speed_boost || 'N/A'}% Faster`,
                          className: 'variant-badge speed-badge'
                        }
                      ]}
                    />
                  </div>
                </div>
                
                <div className="comparison-section">
                  <h4>
                    <span className="variant-icon green">🌱</span>
                    Energy Optimized
                  </h4>
                  <div className="code-container green">
                    <CodeDisplay 
                      code={green_version?.code || ''} 
                      badges={[
                        {
                          icon: <span>🔋</span>,
                          text: `${green_version?.energy_savings || 'N/A'}% Less Energy`,
                          className: 'variant-badge green-badge'
                        }
                      ]}
                    />
                  </div>
                </div>
              </div>
              
              <div className="comparison-footer">
                <p>
                  <strong>Note:</strong> The speed-optimized version prioritizes execution time, 
                  while the energy-optimized version minimizes power consumption. Choose based on your priority.
                </p>
                <motion.button
                  className="apply-btn"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Comparison
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add modal styles
const modalStyles = `
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }
  
  .modal-container {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 1100px;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 20px;
    color: #2c3e50;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }
  
  .close-button:hover {
    color: #e74c3c;
  }
  
  .comparison-content {
    padding: 20px 30px;
    overflow-y: auto;
  }
  
  .comparison-section {
    margin-bottom: 20px;
  }
  
  .comparison-section h4 {
    margin: 0 0 10px 0;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .code-container {
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    background-color: #1e293b;
  }
  
  .code-container.original {
    border-color: #3498db;
  }
  
  .code-container.speed {
    border-color: #f39c12;
  }
  
  .code-container.green {
    border-color: #2ecc71;
  }
  
  .variant-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-size: 14px;
  }
  
  .variant-icon.speed {
    background-color: rgba(243, 156, 18, 0.1);
    color: #f39c12;
  }
  
  .variant-icon.green {
    background-color: rgba(46, 204, 113, 0.1);
    color: #2ecc71;
  }
  
  .variant-badge {
    position: absolute;
    bottom: 15px;
    right: 15px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: white;
  }
  
  .speed-badge {
    background-color: rgba(243, 156, 18, 0.9);
  }
  
  .green-badge {
    background-color: rgba(46, 204, 113, 0.9);
  }
  
  .comparison-footer {
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .comparison-footer p {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
  }
  
  .apply-btn {
    padding: 10px 25px;
    font-size: 15px;
    font-weight: 600;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
  }
  
  .apply-btn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(52, 152, 219, 0.3);
  }
  
  @media (max-width: 768px) {
    .comparison-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);

export default DetailedComparison;