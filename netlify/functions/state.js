// Per-user state read/write
// GET  /api/state?user=X         → state JSON (or {})
// POST /api/state?user=X  body=any-json → save
// (No password check — frontend is supposed to gate this. Soft auth, not security.)
import { getStore } from "@netlify/blobs";

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function normalize(u) {
  return String(u || "").trim().toLowerCase();
}

export default async (req) => {
  const url = new URL(req.url);
  const username = normalize(url.searchParams.get("user"));
  if (!username) return json(400, { error: "user query param required" });

  const states = getStore({ name: "states", consistency: "strong" });

  if (req.method === "GET") {
    const data = await states.get(username, { type: "json" });
    return json(200, data || {});
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); }
    catch { return json(400, { error: "invalid json body" }); }
    if (typeof body !== "object" || body === null) return json(400, { error: "expected object" });
    await states.setJSON(username, body);
    return json(200, { ok: true });
  }

  return json(405, { error: "GET or POST only" });
};
