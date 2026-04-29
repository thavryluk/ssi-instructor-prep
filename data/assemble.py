import json, os, glob, sys

base = os.path.dirname(os.path.abspath(__file__))
parts = sorted(set(
    glob.glob(os.path.join(base, "*_part*.json")) +
    glob.glob(os.path.join(base, "mssi_inst_lessons*.json")) +
    glob.glob(os.path.join(base, "personal_*.json"))
))

all_q = []
for p in parts:
    with open(p, "r", encoding="utf-8") as f:
        data = json.load(f)
        all_q.extend(data)

# Validate
required = {"id", "area", "subarea", "question", "options", "correct", "explanation", "source"}
allowed_areas = {"science_of_diving", "divemaster", "assistant_instructor", "instructor", "open_water_diver", "diver_stress_rescue", "react_right"}
errors = []
seen_ids = set()
counts = {}
for q in all_q:
    missing = required - set(q.keys())
    if missing:
        errors.append((q.get("id", "?"), "missing fields", missing))
    if q.get("id") in seen_ids:
        errors.append((q.get("id"), "duplicate id"))
    seen_ids.add(q.get("id"))
    if q.get("area") not in allowed_areas:
        errors.append((q.get("id"), "bad area", q.get("area")))
    opts = q.get("options", {})
    valid_keys_4 = {"a", "b", "c", "d"}
    valid_keys_2 = {"a", "b"}
    if set(opts.keys()) not in (valid_keys_4, valid_keys_2):
        errors.append((q.get("id"), "options keys", set(opts.keys())))
    if q.get("correct") not in opts:
        errors.append((q.get("id"), "bad correct", q.get("correct")))
    counts[q.get("area")] = counts.get(q.get("area"), 0) + 1

out = {
    "version": "1.0",
    "generated_at": "2026-04-25",
    "note": "SSI study bank for Tomas's Instructor prep app. Each question carries a 'source' URL (Quizlet/dive-shop PDF/SSI training pages) where verbatim wording was found, OR 'compiled_from_dive_theory' for items grounded in public SSI standards and dive physics/physiology that I've authored from established theory rather than copied. Always reconcile with the current SSI Training Standards before using as definitive answers.",
    "total": len(all_q),
    "counts_by_area": counts,
    "questions": all_q,
}

out_path = os.environ.get("ASSEMBLE_OUT") or os.path.join(base, "questions.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print("Wrote:", out_path)

print("Total questions:", len(all_q))
print("Counts:", counts)
print("Errors:", len(errors))
if errors:
    for e in errors[:20]:
        print(" ", e)
