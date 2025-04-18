# GreenCode AI with ChatGPT Backend

GreenCode AI is an intelligent assistant that analyzes your code, identifies energy-intensive patterns, and suggests more sustainable alternatives - without sacrificing performance.

## 🌱 Features

- **Sustainable Code Analysis**: Detect energy-inefficient code patterns
- **AI-Powered Optimization**: Rewrite code to be more energy-efficient
- **AI-Based Optimization**: Uses Hugging Face API for code optimization
- **Energy Impact Metrics**: See how much energy and CO2 you're saving
- **Code Comparisons**: Compare speed-optimized vs. energy-optimized code

## 🚀 Quick Start

### Using the Start Script

The easiest way to start GreenCode AI is using the start script:

```bash
# On Windows
start_greencode_chatgpt.bat
```

### Manual Startup

#### Backend

```bash
# Navigate to backend directory
cd greencode-chatgpt/backend

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python run.py
```

#### Frontend

```bash
# In a new terminal, from the project root
cd front
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 API Options

The backend supports two different AI providers:

- **Hugging Face API** (default): Uses the Hugging Face Inference API with the StarCoder model
- **OpenAI API** (alternative): Uses OpenAI's API for potentially better results

To use either option, you'll need to set up API keys in the `.env` file in the backend directory.

### Setting up API Keys

1. Rename `.env.example` to `.env` in the `greencode-chatgpt/backend` directory
2. Add your API key(s) to the file:

```
# Hugging Face API Key
HUGGINGFACE_API_KEY=your_huggingface_key_here

# OpenAI API Key (optional)
OPENAI_API_KEY=your_openai_key_here

# Which API provider to use: "huggingface" or "openai"
API_PROVIDER=huggingface
```

## 🖥️ System Requirements

- **RAM**: 4GB minimum, 8GB recommended
- **CPU**: Any modern processor (Intel i3 or equivalent)
- **Disk Space**: ~100MB for the application (models are on the cloud)
- **Internet Connection**: Required for API access
- **OS**: Windows, macOS, or Linux

## 🔧 Configuration

You can customize settings in these files:
- Backend config: `greencode-chatgpt/backend/utils/config.py`
- Frontend config: `front/config.js`

## 🔍 Verifying Setup

To verify that your system is properly configured:

```bash
# Start the backend server
cd greencode-chatgpt/backend
python run.py

# In a new terminal, check if the API is responding
curl http://localhost:5000/health
```

You should see a JSON response indicating the backend is healthy.

## 📊 Screenshots

![GreenCode AI Interface](./public/screenshot.png)

## 📜 License

MIT

## 👥 Credits

GreenCode AI uses technology from:
- Hugging Face Transformers
- CodeCarbon
- React
- Flask
