@echo off
echo Restarting GreenCode AI Backend with improved carbon metrics...

rem Set environment variables for API provider
set API_PROVIDER=huggingface
set HUGGINGFACE_API_KEY=your_huggingface_api_key_here

rem Start the backend
echo Starting updated Python backend...
start cmd /k "cd greencode-chatgpt\backend && set API_PROVIDER=huggingface && python run.py"

echo Backend restarted with improved carbon metrics!
echo Backend API is at: http://localhost:5000