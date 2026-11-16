-- Applications from /careers. One row per applicant.
CREATE TABLE applications (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  role        TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  phone       TEXT    NOT NULL,
  email       TEXT,
  area        TEXT,
  status_now  TEXT,   -- student, job, between jobs, freelancer
  experience  TEXT,   -- sales experience band
  hours       TEXT,   -- can commit to the daily targets?
  field_ok    TEXT,   -- can meet owners face to face in Dhaka?
  english     TEXT,
  pitch       TEXT,   -- their own short pitch
  network     TEXT,   -- who they already know
  source      TEXT,   -- which Facebook group / where they heard
  cv_link     TEXT,
  stage       TEXT    NOT NULL DEFAULT 'new',
  score       INTEGER,
  notes       TEXT,
  updated_at  TEXT
);
CREATE INDEX applications_stage ON applications(stage);
CREATE UNIQUE INDEX applications_phone ON applications(phone);
