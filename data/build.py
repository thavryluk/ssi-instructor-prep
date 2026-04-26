"""Cross-platform build for Netlify (works on Windows & Linux).

1. Re-assembles questions.json from chunk files.
2. Creates dist/ and dist/data/.
3. Copies static frontend files + question banks into dist/.
4. Writes dist/version.json with current commit + build timestamp.
"""
import json
import os
import shutil
import subprocess
import sys
from datetime import datetime, timezone

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


# 5. Write version.json (commit hash + build timestamp)
def git_commit():
    # Try git first (local dev). Netlify exposes COMMIT_REF env var.
    env_ref = os.environ.get("COMMIT_REF") or os.environ.get("HEAD")
    if env_ref:
        return env_ref[:7]
    try:
        out = subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"],
            cwd=ROOT, stderr=subprocess.DEVNULL,
        )
        return out.decode().strip()
    except Exception:
        return "unknown"

version = {
    "commit": git_commit(),
    "built_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
}
with open(os.path.join(DIST, "version.json"), "w", encoding="utf-8") as f:
    json.dump(version, f, ensure_ascii=False, indent=2)
print(f"[build] version.json: {version}")

print(f"[build] OK -> {DIST}")
