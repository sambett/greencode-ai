/**
 * API service module
 * Handles all interactions with the backend API
 */

import config from '../config';

/**
 * Analyze code for energy efficiency
 * 
 * @param {string} code - The code to be analyzed
 * @param {Object} options - Additional options
 * @param {boolean} options.advanced - Whether to use advanced analysis
 * @param {string} options.context - Optimization context (energy_efficiency, readability, etc.)
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeCode = async (code, options = {}) => {
  const { advanced = true, context = 'energy_efficiency' } = options;
  
  try {
    // Prepare request URL
    const url = `${config.api.baseUrl}${config.api.endpoints.analyze}`;
    
    // Set up request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
    
    // Make API call
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code,
        advanced,
        context,
        variants: config.features.showVariants
      }),
      signal: controller.signal
    });
    
    // Clear timeout
    clearTimeout(timeoutId);
    
    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    // Parse and return the response data
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout: The server took too long to respond');
    }
    
    // Re-throw the error with additional context
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Check API health status
 * 
 * @returns {Promise<Object>} Health check response
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.health}`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('API is unreachable');
  }
};
