import { createClient } from "npm:@supabase/supabase-js@2";
const origin = Deno.env.get("SITE_ORIGIN") ?? "https://codeatlas-career-guidance.onrender.com";
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin"
};
Deno.serve(async (req) => {
  if (req.headers.get("origin") && req.headers.get("origin") !== origin) {
    return new Response("Origin not allowed", { status: 403 });
  }
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return Response.json({ error: "Authentication required" }, { status: 401, headers: cors });
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) return Response.json({ error: "Account deletion is not configured" }, { status: 503, headers: cors });
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return Response.json({ error: "Invalid session" }, { status: 401, headers: cors });
  const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
  if (deleteError) return Response.json({ error: "Could not delete account" }, { status: 500, headers: cors });
  return Response.json({ ok: true }, { status: 200, headers: cors });
});
