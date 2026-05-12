import json
import os
import urllib.request
import re

json_path = r"C:\Users\Preetham S.M\.gemini\antigravity\brain\3c9975e0-ea43-4fe6-87ce-0ebe4ae9196c\.system_generated\steps\13\output.txt"
output_dir = r"c:\Users\Preetham S.M\Downloads\hackathon\Krishidrishthi\screens"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

screens = data.get("screens", [])

def sanitize_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "", name).strip()

for screen in screens:
    title = screen.get("title", "Untitled")
    filename = sanitize_filename(title) + ".html"
    filepath = os.path.join(output_dir, filename)
    
    html_code_info = screen.get("htmlCode", {})
    download_url = html_code_info.get("downloadUrl")
    
    if download_url:
        print(f"Downloading {title} to {filename}...")
        try:
            # Need to add a user agent since sometimes URLs reject no-UA
            req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                html_content = response.read()
                
            # Keep as bytes since it's UTF-8 encoded
            with open(filepath, 'wb') as out_f:
                out_f.write(html_content)
            print(f"Successfully downloaded {filename}")
        except Exception as e:
            print(f"Failed to download {title}: {e}")
    else:
        print(f"No download URL found for {title}")

print("Done!")
