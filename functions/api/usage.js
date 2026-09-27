// 2026-09-22 /kyg 접속 기록 수집(POST)과 조회(GET)

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  var len = Math.max(a.length, b.length);
  var diff = a.length === b.length ? 0 : 1;
  for (var i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function kstDayStartIso() {
  var shifted = new Date(Date.now() + 9 * 60 * 60 * 1000);
  var ymd = shifted.toISOString().slice(0, 10);
  return new Date(ymd + "T00:00:00+09:00").toISOString();
}

function cleanText(value, max) {
  if (typeof value !== "string") return "";
  var s = value.replace(/[\u0000-\u001f]/g, " ").trim();
  if (s.length > max) s = s.slice(0, max);
  return s;
}

export async function onRequest(context) {
  var request = context.request;
  var env = context.env;

  if (request.method === "POST") return handlePost(request, env);
  if (request.method === "GET") return handleGet(request, env);
  return json({ error: "method" }, 405);
}

async function handlePost(request, env) {
  if (!env.USAGE_DB || !env.USAGE_KEY) return json({ error: "not-configured" }, 503);
  if (!safeEqual(request.headers.get("X-Usage-Key") || "", env.USAGE_KEY)) {
    return json({ error: "unauthorized" }, 401);
  }

  var raw = await request.text();
  if (raw.length > 8000) return json({ error: "too-large" }, 413);

  var body;
  try {
    body = JSON.parse(raw);
  } catch (e) {
    return json({ error: "json" }, 400);
  }

  var school = cleanText(body.school, 80);
  var eventName = cleanText(body.event, 32);
  var job = cleanText(body.job, 16);
  if (!school || !/^[a-z0-9_]{1,32}$/.test(eventName)) {
    return json({ error: "fields" }, 400);
  }
  if (job && !/^[a-z0-9_]{0,16}$/.test(job)) {
    return json({ error: "job" }, 400);
  }

  var extra = {};
  if (body.extra && typeof body.extra === "object") {
    extra.version = cleanText(body.extra.version, 40);
    extra.role = cleanText(body.extra.role, 16);
    extra.host = cleanText(body.extra.host, 40);
  }
  var ip = request.headers.get("CF-Connecting-IP");
  if (ip) extra.ip = cleanText(ip, 64);

  var ts = new Date().toISOString();
  var cutoff = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
  var extraText = JSON.stringify(extra);
  if (extraText.length > 2000) extraText = extraText.slice(0, 2000);

  try {
    await env.USAGE_DB.prepare("DELETE FROM usage_events WHERE ts < ?").bind(cutoff).run();
    await env.USAGE_DB.prepare(
      "INSERT INTO usage_events (ts, school, event, job, extra) VALUES (?, ?, ?, ?, ?)"
    ).bind(ts, school, eventName, job, extraText).run();
  } catch (e) {
    return json({ error: "db" }, 500);
  }
  return json({ ok: true }, 200);
}

async function handleGet(request, env) {
  if (!env.USAGE_DB || !env.ADMIN_PASSWORD) return json({ error: "not-configured" }, 503);
  if (!safeEqual(request.headers.get("X-Admin-Password") || "", env.ADMIN_PASSWORD)) {
    return json({ error: "unauthorized" }, 401);
  }

  var dayStart = kstDayStartIso();
  try {
    var today = await env.USAGE_DB.prepare(
      "SELECT COUNT(DISTINCT school) AS n FROM usage_events WHERE ts >= ?"
    ).bind(dayStart).first();
    var eventsResult = await env.USAGE_DB.prepare(
      "SELECT ts, school, event, job FROM usage_events ORDER BY id DESC LIMIT 100"
    ).all();
    var schoolsResult = await env.USAGE_DB.prepare(
      "SELECT school, MAX(ts) AS last_ts, " +
      "(SELECT job FROM usage_events j WHERE j.school = usage_events.school AND j.event = 'job_start' AND j.job != '' ORDER BY j.id DESC LIMIT 1) AS last_job " +
      "FROM usage_events GROUP BY school ORDER BY last_ts DESC LIMIT 50"
    ).all();
    return json({
      todaySchools: today && today.n ? today.n : 0,
      events: eventsResult.results || [],
      schools: (schoolsResult.results || []).map(function (row) {
        return { school: row.school, lastTs: row.last_ts, lastJob: row.last_job || "" };
      }),
    }, 200);
  } catch (e) {
    return json({ error: "db" }, 500);
  }
}
