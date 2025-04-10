/**
 * Application configuration
 * Central place to manage environment-specific settings
 */

const config = {
  // API configuration
  api: {
    // Base URL for API requests
    // Use environment variable if available, otherwise fallback to development URL
    baseUrl: process.env.REACT_APP_API_URL || 'https://8e44-35-232-228-47.ngrok-free.app',
    
    // API endpoints
    endpoints: {
      analyze: '/analyze',
      health: '/health'
    },
    
    // Request timeout in milliseconds
    timeout: 30000
  },

  // Feature flags
  features: {
    // Enable advanced analysis features
    advancedAnalysis: true,
    // Show optimization variants (fast vs. green)
    showVariants: true
  }
};

export default config;
