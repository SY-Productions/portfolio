/*
  Warnings:

  - You are about to alter the column `enDescription` on the `worksample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `enFullDescription` on the `worksample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `faDescription` on the `worksample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `faFullDescription` on the `worksample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `worksample` MODIFY `enDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `enFullDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `faDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `faFullDescription` VARCHAR(191) NOT NULL DEFAULT '';
