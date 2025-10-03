/*
  Warnings:

  - You are about to drop the column `appStoreLink` on the `WorkSample` table. All the data in the column will be lost.
  - You are about to drop the column `bazarLink` on the `WorkSample` table. All the data in the column will be lost.
  - You are about to drop the column `myketLink` on the `WorkSample` table. All the data in the column will be lost.
  - You are about to drop the column `playstoreLink` on the `WorkSample` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkSample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isWeb" TEXT NOT NULL,
    "faTitle" TEXT NOT NULL,
    "enTitle" TEXT NOT NULL,
    "faDescription" TEXT NOT NULL,
    "enDescription" TEXT NOT NULL,
    "pictures" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "technologys" TEXT NOT NULL,
    "faStartDate" TEXT NOT NULL,
    "enStartDate" TEXT NOT NULL,
    "faEndDate" TEXT NOT NULL,
    "enEndDate" TEXT NOT NULL,
    "customLinks" TEXT
);
INSERT INTO "new_WorkSample" ("customLinks", "enDescription", "enEndDate", "enStartDate", "enTitle", "faDescription", "faEndDate", "faStartDate", "faTitle", "id", "isWeb", "link", "pictures", "technologys") SELECT "customLinks", "enDescription", "enEndDate", "enStartDate", "enTitle", "faDescription", "faEndDate", "faStartDate", "faTitle", "id", "isWeb", "link", "pictures", "technologys" FROM "WorkSample";
DROP TABLE "WorkSample";
ALTER TABLE "new_WorkSample" RENAME TO "WorkSample";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
