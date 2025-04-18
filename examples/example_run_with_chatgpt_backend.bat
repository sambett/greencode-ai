@echo off
echo Starting GreenCode AI with ChatGPT Backend...

rem Load environment variables from .env file
for /f "tokens=*" %%a in (.env) do set %%a

rem Start the backend
echo Starting Python backend...
start cmd /k "cd greencode-chatgpt\backend && set API_PROVIDER=huggingface && python run.py"

rem Wait a moment for the backend to initialize
timeout /t 5 /nobreak

rem Start the frontend
echo Starting React frontend...
start cmd /k "cd front && npm start"

echo GreenCode AI is starting. Please wait for both windows to initialize...
echo Frontend will be available at: http://localhost:3000
echo Backend API is at: http://localhost:5000