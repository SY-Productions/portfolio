/*
  Warnings:

  - A unique constraint covering the columns `[faTitle]` on the table `WorkSample` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enTitle]` on the table `WorkSample` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WorkSample_faTitle_key` ON `WorkSample`(`faTitle`);

-- CreateIndex
CREATE UNIQUE INDEX `WorkSample_enTitle_key` ON `WorkSample`(`enTitle`);
