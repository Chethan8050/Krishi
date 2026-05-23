@echo off
echo ============================================
echo   KisanAI - Starting All Servers
echo ============================================
echo.

echo [1/2] Starting Python ML Backend on Port 8000...
echo       (Disease Detection AI - TensorFlow + MobileNetV2)
cd backend
start cmd /k "title KisanAI ML Backend && venv\Scripts\python.exe main.py"
cd ..

echo Waiting for ML server to load model (10 seconds)...
timeout /t 10 /nobreak >nul

echo.
echo [2/2] Starting Next.js Frontend on Port 3000...
cd kisan-ai
start cmd /k "title KisanAI Frontend && npm run dev"
cd ..

echo.
echo ============================================
echo   Both servers are starting!
echo   ML Backend:  http://localhost:8000
echo   Frontend:    http://localhost:3000
echo   Health Check: http://localhost:8000/
echo ============================================
echo.
echo IMPORTANT: Wait for both windows to fully load before opening the browser.
pause
