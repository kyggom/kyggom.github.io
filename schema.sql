-- 2026-09-22 /kyg 고객사 접속 기록
-- 적용: npx wrangler d1 execute kova-usage --remote --file=schema.sql
-- 시크릿: npx wrangler pages secret put USAGE_KEY
--         npx wrangler pages secret put ADMIN_PASSWORD
-- USAGE_KEY 값은 src/UsagePing.java 의 USAGE_KEY 와 같게 둡니다.

CREATE TABLE IF NOT EXISTS usage_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  school TEXT NOT NULL,
  event TEXT NOT NULL,
  job TEXT,
  extra TEXT
);

CREATE INDEX IF NOT EXISTS idx_usage_ts ON usage_events (ts);
CREATE INDEX IF NOT EXISTS idx_usage_school ON usage_events (school);
