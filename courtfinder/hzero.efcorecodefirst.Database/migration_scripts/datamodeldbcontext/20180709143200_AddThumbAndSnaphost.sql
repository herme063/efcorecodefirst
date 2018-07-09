CREATE TABLE "Snapshots" (
    "CourtUid" uuid NOT NULL,
    "Index" integer NOT NULL,
    "Content" bytea NULL,
    CONSTRAINT "PK_Snapshots" PRIMARY KEY ("CourtUid", "Index"),
    CONSTRAINT "FK_Snapshots_BasketballCourts_CourtUid" FOREIGN KEY ("CourtUid") REFERENCES "BasketballCourts" ("Uid") ON DELETE CASCADE
);

CREATE TABLE "Thumbs" (
    "CourtUid" uuid NOT NULL,
    "Index" integer NOT NULL,
    "Content" bytea NULL,
    CONSTRAINT "PK_Thumbs" PRIMARY KEY ("CourtUid", "Index"),
    CONSTRAINT "FK_Thumbs_BasketballCourts_CourtUid" FOREIGN KEY ("CourtUid") REFERENCES "BasketballCourts" ("Uid") ON DELETE CASCADE
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20180709143200_AddThumbAndSnaphost', '2.1.0-rtm-30799');

