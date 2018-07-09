INSERT INTO "Players" ("Uid", "Email", "UserName")
VALUES (uuid('00000000-0000-0000-0000-000000000001'), 'bogus@hzero.org', 'Admin0')
ON CONFLICT DO NOTHING