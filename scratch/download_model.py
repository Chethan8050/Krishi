import urllib.request
import os
import sys

def download_progress(block_num, block_size, total_size):
    read_so_far = block_num * block_size
    if total_size > 0:
        percent = read_so_far * 1e2 / total_size
        s = "\r%5.1f%% %d / %d" % (percent, read_so_far, total_size)
        sys.stdout.write(s)
        if read_so_far >= total_size:
            sys.stdout.write("\n")
    else:
        sys.stdout.write("\rread %d" % (read_so_far))

# Standard High-Accuracy PlantVillage Model (38 classes)
url = "https://github.com/shubham-at-bits/Plant-Disease-Detection-using-CNN/raw/master/plant_disease_model.h5"
dest = "backend/model.h5"

print(f"Downloading from {url}...")
try:
    if not os.path.exists('backend'):
        os.makedirs('backend')
    
    # Using a different user agent to prevent "Connection Closed" issues
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)
    
    urllib.request.urlretrieve(url, dest, reporthook=download_progress)
    print("\nDownload Complete!")
except Exception as e:
    print(f"\nError: {e}")
    sys.exit(1)
