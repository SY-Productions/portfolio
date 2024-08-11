/*
  Warnings:

  - Made the column `pictures` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `technologys` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enDescription` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enEndDate` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enFullDescription` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enStartDate` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enTitle` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faDescription` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faEndDate` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faFullDescription` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faStartDate` on table `worksample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faTitle` on table `worksample` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `worksample` MODIFY `pictures` VARCHAR(191) NOT NULL,
    MODIFY `link` VARCHAR(191) NOT NULL,
    MODIFY `technologys` VARCHAR(191) NOT NULL,
    MODIFY `enDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `enEndDate` VARCHAR(191) NOT NULL,
    MODIFY `enFullDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `enStartDate` VARCHAR(191) NOT NULL,
    MODIFY `enTitle` VARCHAR(191) NOT NULL,
    MODIFY `faDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `faEndDate` VARCHAR(191) NOT NULL,
    MODIFY `faFullDescription` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `faStartDate` VARCHAR(191) NOT NULL,
    MODIFY `faTitle` VARCHAR(191) NOT NULL;
