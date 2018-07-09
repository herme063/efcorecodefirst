ALTER TABLE "BasketballCourts" ADD "AddedByUid" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE "BasketballCourts" ADD "AddedOn" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '0001-01-01 00:00:00';

CREATE UNIQUE INDEX "IX_BasketballCourts_AddedByUid" ON "BasketballCourts" ("AddedByUid");

ALTER TABLE "BasketballCourts" ADD CONSTRAINT "FK_BasketballCourts_Players_AddedByUid" FOREIGN KEY ("AddedByUid") REFERENCES "Players" ("Uid") ON DELETE CASCADE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20180709191521_AddedOwnerOnCourt', '2.1.0-rtm-30799');

