import os
import re

app_dir = r'c:\Users\Preetham S.M\Downloads\hackathon\Krishidrishthi\kisan-ai\app'

# Pattern to remove BottomNav import and component
import_pattern = re.compile(r"import BottomNav from ['\"].*components/BottomNav['\"];?\n?")
component_pattern = re.compile(r"<BottomNav\s*/>\n?")

for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = import_pattern.sub('', content)
            new_content = component_pattern.sub('', new_content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Cleaned: {path}")
