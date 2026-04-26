// List all registered usernames (for dashboard switcher)
// GET /api/users → { users: ["honza", "petr", ...] }
import { getStore } from "@netlify/blobs";

export default async () => {
  const users = getStore({ name: "users", consistency: "strong" });
  const list = await users.list();
  const usernames = (list.blobs || []).map((b) => b.key).sort();
  return new Response(JSON.stringify({ users: usernames }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
