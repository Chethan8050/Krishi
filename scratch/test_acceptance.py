import requests
import subprocess
import time
import os
import sys

# Path to the real leaf image I just generated
image_path = r'C:\Users\Preetham S.M\.gemini\antigravity\brain\6ec022fa-e1f0-4d6f-8b67-00607a5ee8d5\real_test_leaf_tomato_1778529109827.png'

print("--- LIVE ACCEPTANCE TEST START ---")
print(f"Test Image: Real Tomato Leaf")

# 1. Start the backend
print("Starting backend server...")
process = subprocess.Popen([sys.executable, 'backend/main.py'], 
                         stdout=subprocess.PIPE, 
                         stderr=subprocess.PIPE,
                         text=True)

# 2. Wait for server
print("Waiting for AI to load...")
time.sleep(15) 

# 3. Send the image
print("Scanning Tomato Leaf...")
try:
    with open(image_path, 'rb') as f:
        files = {'file': ('leaf.png', f, 'image/png')}
        response = requests.post("http://localhost:8000/predict", files=files)
        
    print("\n--- SCANNER RESULT ---")
    result = response.json()
    if result.get('success'):
        print("SUCCESS: The AI accepted the real leaf!")
        print(f"Diagnosis: {result.get('prediction')}")
        print(f"Confidence: {result.get('confidence'):.2%}")
    else:
        print(f"REJECTED ERROR: {result.get('message')}")
except Exception as e:
    print(f"Error during scan: {e}")

# 4. Cleanup
process.terminate()
print("\nTest Complete.")
