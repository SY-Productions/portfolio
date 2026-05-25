-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameAr" TEXT NOT NULL DEFAULT '',
    "fromYear" INTEGER NOT NULL,
    "toYear" INTEGER,
    "picture" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionAr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Education" ("description", "fromYear", "id", "name", "order", "picture", "toYear") SELECT "description", "fromYear", "id", "name", "order", "picture", "toYear" FROM "Education";
DROP TABLE "Education";
ALTER TABLE "new_Education" RENAME TO "Education";
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameAr" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionAr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Event" ("attachment", "date", "description", "id", "name", "order", "picture") SELECT "attachment", "date", "description", "id", "name", "order", "picture" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameAr" TEXT NOT NULL DEFAULT '',
    "technos" TEXT NOT NULL,
    "fromYear" INTEGER NOT NULL,
    "toYear" INTEGER,
    "picture" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionAr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Work" ("description", "fromYear", "id", "name", "order", "picture", "technos", "toYear", "url") SELECT "description", "fromYear", "id", "name", "order", "picture", "technos", "toYear", "url" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
CREATE TABLE "new_WorkSample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isWeb" TEXT NOT NULL,
    "faTitle" TEXT NOT NULL,
    "enTitle" TEXT NOT NULL,
    "arTitle" TEXT NOT NULL DEFAULT '',
    "faDescription" TEXT NOT NULL,
    "enDescription" TEXT NOT NULL,
    "arDescription" TEXT NOT NULL DEFAULT '',
    "pictures" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "technologys" TEXT NOT NULL,
    "faStartDate" TEXT NOT NULL,
    "enStartDate" TEXT NOT NULL,
    "arStartDate" TEXT NOT NULL DEFAULT '',
    "faEndDate" TEXT NOT NULL,
    "enEndDate" TEXT NOT NULL,
    "arEndDate" TEXT NOT NULL DEFAULT '',
    "customLinks" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_WorkSample" ("customLinks", "enDescription", "enEndDate", "enStartDate", "enTitle", "faDescription", "faEndDate", "faStartDate", "faTitle", "id", "isWeb", "link", "order", "pictures", "technologys") SELECT "customLinks", "enDescription", "enEndDate", "enStartDate", "enTitle", "faDescription", "faEndDate", "faStartDate", "faTitle", "id", "isWeb", "link", "order", "pictures", "technologys" FROM "WorkSample";
DROP TABLE "WorkSample";
ALTER TABLE "new_WorkSample" RENAME TO "WorkSample";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
