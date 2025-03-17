-- CreateTable
CREATE TABLE "WorkSample" (
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
    "enEndDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fromYear" INTEGER NOT NULL,
    "toYear" INTEGER,
    "picture" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "technos" TEXT NOT NULL,
    "fromYear" INTEGER NOT NULL,
    "toYear" INTEGER,
    "picture" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
