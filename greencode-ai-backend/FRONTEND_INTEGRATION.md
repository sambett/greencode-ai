# Frontend Integration Guide

This guide shows how to connect your existing GreenCode AI frontend with the backend.

## Frontend Configuration

Your frontend is already deployed at https://greencode-ai.vercel.app/, so you'll need to configure it to connect to your local backend.

### Option 1: Configure API URL in Environment Variables

If your frontend allows setting environment variables, add:

```
REACT_APP_API_URL=http://localhost:5000
```

### Option 2: Configure in Frontend Code

Look for the API configuration file in your frontend code (typically in `/src/config.js` or `/src/services/api.js`) and update the API URL:

```javascript
// Example config.js
export const API_URL = 'http://localhost:5000';
```

## CORS Configuration

The backend has CORS enabled for all routes by default, but if you encounter CORS issues, you might need to update the configuration in the backend's `app.py` file:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://greencode-ai.vercel.app"}})
```

## API Calls from Frontend

Your frontend should make API calls to the backend for code analysis. Here's an example of how to implement it:

```javascript
async function analyzeCode(code) {
  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        context: 'energy_efficiency',
        advanced: true,
        variants: true
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
}
```

## Testing the Integration

1. Start the backend server using `start_backend.bat` or `start_backend.sh`
2. Open your frontend application
3. Submit code for analysis
4. Check the browser console and network tab to ensure API calls are being made correctly

## Troubleshooting

If you encounter issues:

1. **Check Network tab:** Verify API calls are being made to the correct URL
2. **Check Console:** Look for errors in the browser console
3. **Check CORS:** Ensure CORS is properly configured
4. **Check Backend logs:** Look for errors in the backend console

## Running Backend in Production

For a production environment:

1. Deploy the backend to a service like Heroku, DigitalOcean, or AWS
2. Update the frontend API URL to point to your production backend
3. Configure proper CORS settings for your production domain
4. Consider implementing authentication for API endpoints