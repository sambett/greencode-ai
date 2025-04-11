# GreenCode AI - Backend

This is the backend for the GreenCode AI application, which analyzes code for energy efficiency and provides optimization suggestions to reduce carbon emissions.

## Features

- 🔍 Static code analysis to detect inefficient patterns
- 🧠 AI-powered code optimization using StarCoder
- 📊 Energy consumption and CO2 emissions estimation
- 🚀 RESTful API for seamless frontend integration

## Model Files

Due to GitHub file size limitations, the large model files are not included in the repository. There are two ways to handle this:

1. **Automatic Download**: The application will automatically download models when first used.
2. **Manual Setup**: Run the setup script to download models in advance:
   ```bash
   python setup_model.py
   ```

If you already have the StarCoder model cached on your system, the application will find and use it automatically.

### Model Location

The models are typically cached in:
- Windows: `C:\Users\<username>\.cache\huggingface\hub`
- Linux/Mac: `~/.cache/huggingface/hub`

## Simplified Running Instructions

### Prerequisites

- Conda environment 'greencode' with all dependencies installed
- StarCoder model already cached locally

### Quick Start

1. **Verify Cached Model (One-Time Setup)**
   ```bash
   cd C:\Users\SelmaB\Desktop\greencode-ai\greencode-ai\backend
   python test_cached_model.py
   ```
   This verifies the model is properly cached and working.

2. **Start the Backend**
   ```bash
   # Make sure your 'greencode' conda environment is active
   cd C:\Users\SelmaB\Desktop\greencode-ai\greencode-ai\backend
   python run_simple.py
   ```
   This starts the Flask server on http://localhost:5000 using only cached models.

3. **Start the Frontend**
   In a new terminal:
   ```bash
   cd C:\Users\SelmaB\Desktop\greencode-ai\greencode-ai
   npm start
   ```
   This launches the React app at http://localhost:3000.

## Testing with Postman

1. Open Postman and import: `GreenCodeAI-Postman.json` from the project root
2. Change the collection variable `baseUrl` to: `http://localhost:5000`
3. Test endpoints:
   - Health check: `GET {{baseUrl}}/health`
   - Code analysis: `POST {{baseUrl}}/analyze`

## API Endpoints

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: `{"status": "healthy", "message": "GreenCode AI Backend is running"}`

### Analyze Code
- **URL**: `/analyze`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "code": "your_python_code_here"
  }
  ```
- **Response**:
  ```json
  {
    "original_code": "original code",
    "optimized_code": "optimized code",
    "analysis": {
      "inefficiencies": [],
      "suggestions": [],
      "severity": "low"
    },
    "energy_saved": "2.8",
    "co2_saved": "1.5",
    "green_score": {
      "original": 60,
      "optimized": 85,
      "improvement": 25
    }
  }
  ```

## Project Structure

- `/backend` - Contains the Flask API and cached model
- `/src` - React frontend components
- `/greencode-ai-backend` - Alternative Google Colab implementation (ignore for local development)

## Technology Stack

- **Flask**: Lightweight web framework
- **StarCoder**: AI model for code optimization
- **CodeCarbon**: Tool for estimating carbon emissions
- **React**: Frontend framework
