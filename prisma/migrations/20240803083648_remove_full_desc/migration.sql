/*
  Warnings:

  - You are about to drop the column `enFullDescription` on the `worksample` table. All the data in the column will be lost.
  - You are about to drop the column `faFullDescription` on the `worksample` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `worksample` DROP COLUMN `enFullDescription`,
    DROP COLUMN `faFullDescription`;
