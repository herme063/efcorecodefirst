DROP INDEX "IX_BasketballCourts_AddedByUid";

CREATE INDEX "IX_BasketballCourts_AddedByUid" ON "BasketballCourts" ("AddedByUid");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20180709195443_RemoveIndexOnCourtOwner', '2.1.0-rtm-30799');

