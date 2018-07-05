CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" varchar(150) NOT NULL,
    "ProductVersion" varchar(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

CREATE TABLE "BasketballCourts" (
    "Uid" uuid NOT NULL,
    "Address" text NULL,
    "Latitude" numeric NOT NULL,
    "Longitude" numeric NOT NULL,
    "Format" integer NOT NULL,
    "Location" integer NOT NULL,
    CONSTRAINT "PK_BasketballCourts" PRIMARY KEY ("Uid")
);

CREATE TABLE "Players" (
    "Uid" uuid NOT NULL,
    "UserName" text NULL,
    "Email" text NULL,
    CONSTRAINT "PK_Players" PRIMARY KEY ("Uid")
);

CREATE TABLE "Ratings" (
    "Uid" uuid NOT NULL,
    "Score" integer NOT NULL,
    "Comment" text NULL,
    "PlayerId" uuid NOT NULL,
    "BasketballCourtUid" uuid NULL,
    CONSTRAINT "PK_Ratings" PRIMARY KEY ("Uid"),
    CONSTRAINT "FK_Ratings_BasketballCourts_BasketballCourtUid" FOREIGN KEY ("BasketballCourtUid") REFERENCES "BasketballCourts" ("Uid") ON DELETE RESTRICT,
    CONSTRAINT "FK_Ratings_Players_PlayerId" FOREIGN KEY ("PlayerId") REFERENCES "Players" ("Uid") ON DELETE CASCADE
);

CREATE INDEX "IX_Ratings_BasketballCourtUid" ON "Ratings" ("BasketballCourtUid");

CREATE UNIQUE INDEX "IX_Ratings_PlayerId" ON "Ratings" ("PlayerId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20180629201032_InitialMigration', '2.1.0-rtm-30799');

ALTER TABLE "Ratings" DROP CONSTRAINT "FK_Ratings_BasketballCourts_BasketballCourtUid";

ALTER TABLE "Ratings" DROP CONSTRAINT "FK_Ratings_Players_PlayerId";

ALTER TABLE "Ratings" DROP CONSTRAINT "PK_Ratings";

DROP INDEX "IX_Ratings_BasketballCourtUid";

DROP INDEX "IX_Ratings_PlayerId";

ALTER TABLE "Ratings" DROP COLUMN "Uid";

ALTER TABLE "Ratings" DROP COLUMN "BasketballCourtUid";

ALTER TABLE "Ratings" RENAME COLUMN "PlayerId" TO "PlayerUid";

ALTER TABLE "Ratings" ADD "CourtUid" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE "Ratings" ADD "Timestamp" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '0001-01-01 00:00:00';

ALTER TABLE "Ratings" ADD CONSTRAINT "PK_Ratings" PRIMARY KEY ("CourtUid", "PlayerUid");

CREATE INDEX "IX_Ratings_PlayerUid" ON "Ratings" ("PlayerUid");

ALTER TABLE "Ratings" ADD CONSTRAINT "FK_Ratings_BasketballCourts_CourtUid" FOREIGN KEY ("CourtUid") REFERENCES "BasketballCourts" ("Uid") ON DELETE CASCADE;

ALTER TABLE "Ratings" ADD CONSTRAINT "FK_Ratings_Players_PlayerUid" FOREIGN KEY ("PlayerUid") REFERENCES "Players" ("Uid") ON DELETE CASCADE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20180705195540_ModelsUpdate', '2.1.0-rtm-30799');

