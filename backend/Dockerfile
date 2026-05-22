FROM python:3.11-slim\n\nWORKDIR /app\n\nCOPY requirements.txt ./\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . ./\n\nEXPOSE 8000\n\nCMD ["python", "main.py"]\n
