"""Assemble translated chunks into data/questions.cs.json with validation."""
import json
import os
import sys
import glob
from datetime import datetime, timezone

ROOT = os.path.dirname(__file__)
SRC = os.path.join(ROOT, "questions.json")
TRANSLATED_DIR = os.path.join(ROOT, "cs", "translated")
OUT = os.path.join(ROOT, "questions.cs.json")

src_data = json.load(open(SRC, encoding="utf-8"))
src_qs = src_data["questions"]
src_by_id = {q["id"]: q for q in src_qs}

chunks = sorted(glob.glob(os.path.join(TRANSLATED_DIR, "chunk_*.json")))
if not chunks:
    print(f"ERROR: no chunks found in {TRANSLATED_DIR}", file=sys.stderr)
    sys.exit(1)

translated_qs = []
for c in chunks:
    translated_qs.extend(json.load(open(c, encoding="utf-8")))

print(f"Loaded {len(chunks)} chunks → {len(translated_qs)} translated questions")
print(f"Source: {len(src_qs)} questions")

# Validation
errors = []
seen_ids = set()
for q in translated_qs:
    qid = q.get("id")
    if not qid:
        errors.append(f"missing id: {q}")
        continue
    if qid in seen_ids:
        errors.append(f"duplicate id: {qid}")
    seen_ids.add(qid)
    src = src_by_id.get(qid)
    if not src:
        errors.append(f"unknown id (not in source): {qid}")
        continue
    # Structural checks
    if q.get("area") != src["area"]:
        errors.append(f"{qid}: area changed ({src['area']} → {q.get('area')})")
    if q.get("correct") != src["correct"]:
        errors.append(f"{qid}: correct changed ({src['correct']} → {q.get('correct')})")
    if q.get("source") != src["source"]:
        errors.append(f"{qid}: source changed")
    src_keys = sorted(src["options"].keys())
    tgt_keys = sorted((q.get("options") or {}).keys())
    if src_keys != tgt_keys:
        errors.append(f"{qid}: option keys changed ({src_keys} → {tgt_keys})")
    # Content non-empty
    if not q.get("question"):
        errors.append(f"{qid}: empty question")
    if not q.get("explanation"):
        errors.append(f"{qid}: empty explanation")
    for k, v in (q.get("options") or {}).items():
        if not v:
            errors.append(f"{qid}: empty option {k}")

# Coverage
missing_ids = [qid for qid in src_by_id.keys() if qid not in seen_ids]
if missing_ids:
    errors.append(f"{len(missing_ids)} missing ids: {missing_ids[:10]}{'...' if len(missing_ids) > 10 else ''}")

if errors:
    print(f"\n{len(errors)} VALIDATION ERROR(S):")
    for e in errors[:30]:
        print(f"  - {e}")
    if len(errors) > 30:
        print(f"  ... and {len(errors) - 30} more")
    sys.exit(1)

# Sort by source order to be deterministic
order = {q["id"]: i for i, q in enumerate(src_qs)}
translated_qs.sort(key=lambda q: order[q["id"]])

out_data = {
    "version": src_data.get("version"),
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "language": "cs",
    "translated_from": "questions.json",
    "note": "Czech translation. UI strings via app.js I18N. Subareas/area/source kept in EN.",
    "total": len(translated_qs),
    "counts_by_area": {},
    "questions": translated_qs,
}
for q in translated_qs:
    out_data["counts_by_area"][q["area"]] = out_data["counts_by_area"].get(q["area"], 0) + 1

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(out_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Wrote {OUT}")
print(f"   {len(translated_qs)} questions, counts: {out_data['counts_by_area']}")
