# GreenCode AI

An intelligent assistant that analyzes your code, identifies energy-intensive patterns, and suggests more sustainable alternatives to reduce carbon emissions while maintaining performance.

## Project Structure

- **`/backend`**: Flask API and StarCoder model integration
- **`/src`**: React frontend components
- **`/greencode-ai-backend`**: Alternative Google Colab implementation (ignore for local development)
- **`GreenCodeAI-Postman.json`**: API testing collection

## Quick Start

### First Time Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/greencode-ai.git
cd greencode-ai

# Set up the model (downloads or finds cached model)
cd backend
python setup_model.py
cd ..

# Install frontend dependencies
npm install
```

### Running the Application

1. **Start the Backend**:
   ```bash
   # Make sure your 'greencode' conda environment is active
   cd backend
   python run_simple.py
   ```
   This starts a Flask server on http://localhost:5000.

2. **Start the Frontend**:
   ```bash
   # In a new terminal
   npm start
   ```
   This opens the React app at http://localhost:3000.

## GitHub and Large Files

**Important:** The large model files (4.5GB+) are not included in the repository due to GitHub's file size limitations. When you clone the repository, you have two options:

1. **Automatic Download**: Run the application and it will download the model when first used.
2. **Manual Setup**: Run `python backend/setup_model.py` to set up the model in advance.

The application will automatically find the model if you've previously downloaded it with Hugging Face.

### If Pushing to Your Own Repository

The `.gitignore` file is configured to exclude large model files while keeping the model structure. This prevents pushing large files to GitHub.

## Features

- Code analysis for energy efficiency
- AI-powered optimization suggestions
- Energy consumption and CO2 emissions estimations
- Visualization of sustainability metrics
- Educational tips for writing sustainable code

## Technology Stack

- **Backend**: Flask, StarCoder AI, CodeCarbon
- **Frontend**: React, Styled Components, Framer Motion
