@echo off
echo Starting KisanAI Hackathon Environment...
echo.

echo [1] Starting Python ML Server on Port 8000...
cd backend
start cmd /k "python main.py"
cd ..

echo [2] Starting Next.js Frontend on Port 3000...
cd kisan-ai
start cmd /k "npm run dev"
cd ..

echo.
echo Both servers are starting in new windows!
echo Once they load, open your browser to: http://localhost:3000
pause
