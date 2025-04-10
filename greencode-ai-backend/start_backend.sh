#!/bin/bash
echo "Starting GreenCode AI Backend..."

# Set environment variables (modify these as needed)
export HUGGINGFACE_TOKEN="your_token_here"
export LOCAL_MODEL_PATH="./models"
export COLAB_URL=""

echo "Running Flask backend on http://localhost:5000"
python app.py