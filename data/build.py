"""Cross-platform build for Netlify (works on Windows & Linux).

1. Re-assembles questions.json from chunk files.
2. Creates dist/ and dist/data/.
3. Copies static frontend files + question banks into dist/.
"""
import os
import shutil
import sys
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
DIST = os.path.join(ROOT, "dist")
DIST_DATA = os.path.join(DIST, "data")

# 1. Re-assemble questions.json (in case chunks changed)
print("[build] Running assemble.py...")
subprocess.run([sys.executable, os.path.join(DATA, "assemble.py")], check=True)

# 2. Prepare dist/
os.makedirs(DIST_DATA, exist_ok=True)

# 3. Copy frontend files
for f in ["index.html", "styles.css", "app.js"]:
    src = os.path.join(ROOT, f)
    dst = os.path.join(DIST, f)
    shutil.copy2(src, dst)
    print(f"[build] copied {f}")

# 4. Copy question banks
for f in ["questions.json", "questions.cs.json"]:
    src = os.path.join(DATA, f)
    if not os.path.exists(src):
        print(f"[build] WARN: {f} missing, skipped")
        continue
    dst = os.path.join(DIST_DATA, f)
    shutil.copy2(src, dst)
    print(f"[build] copied data/{f}")

print(f"[build] OK -> {DIST}")
