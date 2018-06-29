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
VALUES ('20180629201032_InitialMigration', '2.1.1-rtm-30846');

