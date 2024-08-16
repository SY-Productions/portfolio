-- CreateTable
CREATE TABLE "WorkSample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isWeb" BOOLEAN NOT NULL DEFAULT true,
    "faTitle" TEXT NOT NULL,
    "enTitle" TEXT NOT NULL,
    "faDescription" TEXT NOT NULL DEFAULT '',
    "enDescription" TEXT NOT NULL DEFAULT '',
    "pictures" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "technologys" TEXT NOT NULL,
    "faStartDate" TEXT NOT NULL,
    "enStartDate" TEXT NOT NULL,
    "faEndDate" TEXT NOT NULL,
    "enEndDate" TEXT NOT NULL
);
