@echo off
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo Starting FastAPI server on http://localhost:8000
python main.py
pause
