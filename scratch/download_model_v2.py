import urllib.request
import os
import sys

# High-quality PlantVillage model from a popular repo
url = "https://github.com/mridul0703/Plant-Disease-Prediction-Model/raw/main/Plant_Disease_Detection.h5"
dest = "backend/model.h5"

print(f"Downloading Best Model from {url}...")
try:
    if not os.path.exists('backend'):
        os.makedirs('backend')
    
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)
    
    urllib.request.urlretrieve(url, dest)
    print("Download Complete!")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
