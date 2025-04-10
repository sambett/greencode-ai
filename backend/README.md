# GreenCode AI - Backend

This is the backend for the GreenCode AI application, which analyzes code for energy efficiency and provides optimization suggestions to reduce carbon emissions.

## Features

- 🔍 Static code analysis to detect inefficient patterns
- 🧠 AI-powered code optimization using StarCoder
- 📊 Energy consumption and CO2 emissions estimation
- 🚀 RESTful API for seamless frontend integration

## Setup and Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Option 1: Quick Setup (Windows)

1. Run the setup script to create a virtual environment and install dependencies:
   ```
   setup.bat
   ```

2. Start the server:
   ```
   run.bat
   ```

3. The API will be available at http://localhost:5000

### Option 2: Manual Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   python app.py
   ```

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

## Technology Stack

- **Flask**: Lightweight web framework
- **StarCoder**: AI model for code optimization
- **CodeCarbon**: Tool for estimating carbon emissions
- **Flask-CORS**: For cross-origin resource sharing
- **Gunicorn**: WSGI HTTP server for deployment

## Deployment

This backend can be deployed to various platforms:

### Heroku
```bash
heroku create greencode-ai-backend
git subtree push --prefix backend heroku main
```

### Vercel
Configure the `vercel.json` file and deploy using the Vercel CLI:
```bash
vercel --prod
```

## Environment Variables

You can customize the server by setting the following environment variables in a `.env` file:

- `FLASK_APP`: The application entry point (default: app.py)
- `FLASK_ENV`: The environment to run in (development/production)
- `FLASK_DEBUG`: Enable debug mode (0/1)
- `PORT`: The port to run the server on (default: 5000)
- `CORS_ORIGINS`: Allowed origins for CORS (comma-separated list)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
