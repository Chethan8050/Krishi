import requests
import subprocess
import time
import os
import sys

# Path to the fake image I just generated
image_path = r'C:\Users\Preetham S.M\.gemini\antigravity\brain\6ec022fa-e1f0-4d6f-8b67-00607a5ee8d5\fake_test_image_dog_1778528275633.png'

print("--- 100% ACCURACY TEST START ---")
print(f"Test Image: Dog Photo")

# 1. Start the backend in the background
print("Starting backend server...")
process = subprocess.Popen([sys.executable, 'backend/main.py'], 
                         stdout=subprocess.PIPE, 
                         stderr=subprocess.PIPE,
                         text=True)

# 2. Wait for the server to be ready
print("Waiting for AI to load (approx 10s)...")
max_retries = 20
server_ready = False
for i in range(max_retries):
    try:
        response = requests.get("http://localhost:8000/")
        if response.status_code == 200:
            server_ready = True
            break
    except:
        time.sleep(2)

if not server_ready:
    print("Error: Server failed to start in time.")
    process.terminate()
    sys.exit(1)

print("Server is ONLINE.")

# 3. Send the fake image
print("Sending 'Fake' Dog Image to scanner...")
try:
    with open(image_path, 'rb') as f:
        files = {'file': ('dog.png', f, 'image/png')}
        response = requests.post("http://localhost:8000/predict", files=files)
        
    print("\n--- SCANNER RESULT ---")
    result = response.json()
    if result.get('prediction') == "Not a Plant":
        print("SUCCESS: The AI rejected the fake image!")
        print(f"AI Message: {result.get('message')}")
    else:
        print("FAILED: The AI was tricked!")
        print(f"AI Guess: {result}")
except Exception as e:
    print(f"Error during scan: {e}")

# 4. Cleanup
process.terminate()
print("\nTest Complete.")
