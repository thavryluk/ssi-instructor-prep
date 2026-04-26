"""Split questions.json into N chunks for parallel translation."""
import json
import os
import sys

CHUNKS = int(sys.argv[1]) if len(sys.argv) > 1 else 5
SRC = os.path.join(os.path.dirname(__file__), "questions.json")
OUT_DIR = os.path.join(os.path.dirname(__file__), "cs", "source")

os.makedirs(OUT_DIR, exist_ok=True)
data = json.load(open(SRC, encoding="utf-8"))
qs = data["questions"]
chunk_size = (len(qs) + CHUNKS - 1) // CHUNKS

for i in range(CHUNKS):
    start = i * chunk_size
    end = min(start + chunk_size, len(qs))
    chunk = qs[start:end]
    out = os.path.join(OUT_DIR, f"chunk_{i}.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(chunk, f, ensure_ascii=False, indent=2)
    print(f"chunk_{i}.json: questions {start}..{end-1} ({len(chunk)} items)")

print(f"\nTotal: {len(qs)} questions into {CHUNKS} chunks at {OUT_DIR}")
