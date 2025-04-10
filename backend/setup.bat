@echo off
echo Setting up GreenCode AI Backend...

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Setup complete!
echo.
echo To start the server, run:
echo     venv\Scripts\python.exe app.py
echo.
echo To deactivate the virtual environment when done, run:
echo     deactivate
