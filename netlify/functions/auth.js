// Register / login with plaintext password (soft auth — data separation, not security)
// POST /api/auth?action=register  body { username, password }
// POST /api/auth?action=login     body { username, password }
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
  if (req.method !== "POST") return json(405, { error: "POST only" });

  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  let body;
  try { body = await req.json(); }
  catch { return json(400, { error: "invalid json body" }); }

  const username = normalize(body.username);
  const password = String(body.password || "");

  if (!username || !/^[a-z0-9._-]{2,32}$/.test(username)) {
    return json(400, { error: "username must be 2-32 chars, a-z 0-9 . _ -" });
  }

  const users = getStore({ name: "users", consistency: "strong" });

  if (action === "register") {
    const existing = await users.get(username, { type: "json" });
    if (existing) return json(409, { error: "username already taken" });
    await users.setJSON(username, {
      password,
      createdAt: new Date().toISOString(),
    });
    return json(200, { ok: true, username });
  }

  if (action === "login") {
    const u = await users.get(username, { type: "json" });
    if (!u) return json(404, { error: "no such user" });
    if ((u.password || "") !== password) return json(401, { error: "wrong password" });
    return json(200, { ok: true, username });
  }

  return json(400, { error: "action must be 'register' or 'login'" });
};
