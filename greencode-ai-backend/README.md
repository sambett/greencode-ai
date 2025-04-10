# GreenCode AI Backend

This is the backend for the GreenCode AI tool, which analyzes Python code for energy inefficiencies and suggests optimized alternatives.

## Features

- Flask API for code analysis
- Integration with Hugging Face's StarCoder models
- Energy consumption measurement with CodeCarbon
- Code complexity analysis
- Rule-based and AI-based optimization
- Dual-mode setup with local lightweight model and remote full-size model

## Requirements

- Python 3.8+
- 16GB RAM for running the local backend with smaller models
- External SSD for storing model weights (optional but recommended)
- Hugging Face account with access token

## Setup

### Local Backend

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/greencode-ai-backend.git
   cd greencode-ai-backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```
   # On Windows (PowerShell)
   $env:HUGGINGFACE_TOKEN = "your_huggingface_token"
   $env:LOCAL_MODEL_PATH = "path/to/your/external/ssd/models"  # Optional
   $env:COLAB_URL = "your_colab_ngrok_url"  # Optional, only if using remote model
   
   # On Linux/macOS
   export HUGGINGFACE_TOKEN="your_huggingface_token"
   export LOCAL_MODEL_PATH="path/to/your/external/ssd/models"  # Optional
   export COLAB_URL="your_colab_ngrok_url"  # Optional, only if using remote model
   ```

5. Run the server:
   ```
   python app.py
   ```

The server will be available at `http://localhost:5000`.

### Remote StarCoder 15B (Google Colab)

1. Open the `StarCoder15B_Remote_Optimization.ipynb` notebook in Google Colab.
2. Run all cells.
3. Log in to Hugging Face when prompted.
4. Copy the ngrok URL from the output.
5. Set the `COLAB_URL` environment variable in your local backend to this URL.

## API Endpoints

### POST /analyze

Analyzes and optimizes Python code.

Request body:
```json
{
  "code": "def example_function():\n    result = []\n    ...",
  "context": "energy_efficiency",  // Optional: "energy_efficiency", "memory_efficiency", "performance", "readability"
  "advanced": true,  // Optional: Use advanced analysis
  "variants": true   // Optional: Generate different optimization variants
}
```

Response:
```json
{
  "original_code": "...",
  "optimized_code": "...",
  "analysis": {
    "inefficiencies": [...],
    "severity": "low",
    "suggestions": [...]
  },
  "algorithm_analysis": {
    "time_complexity": "O(n)",
    "space_complexity": "O(n)",
    "analysis_time": 0.0
  },
  "optimization": {
    "context": "energy_efficiency",
    "explanation": "...",
    "changes": [...]
  },
  "green_score": {
    "original": 70,
    "optimized": 85,
    "improvement": 15
  },
  "co2_saved": "0.002",
  "energy_saved": "5.6",
  "variants": {
    "fast_version": {...},
    "green_version": {...},
    "recommended": "green",
    "trade_off": "..."
  }
}
```

### GET /health

Health check endpoint to verify the backend is running correctly.

## Common Issues

1. **Memory errors when loading the model:**
   - Try setting `LOCAL_MODEL_PATH` to an external drive with more space
   - Make sure no other memory-intensive applications are running
   - Restart your machine to free up memory

2. **Model not loading properly:**
   - Verify your Hugging Face token is correct
   - Check the Hugging Face website to ensure the model is available
   - Try running with a smaller model like `bigcode/starcoderbase-1b`

3. **Remote model connection issues:**
   - Make sure the Colab notebook is still running
   - Check if the ngrok URL has expired (they typically last 2 hours)
   - Verify no firewalls are blocking the connection

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The StarCoder team for providing the models
- CodeCarbon for the energy measurement tools
- The Hugging Face team for their transformers library
