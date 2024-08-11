/*
  Warnings:

  - You are about to drop the column `description` on the `worksample` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `worksample` table. All the data in the column will be lost.
  - You are about to drop the column `fullDescription` on the `worksample` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `worksample` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `worksample` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[faTitle]` on the table `WorkSample` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enTitle]` on the table `WorkSample` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enEndDate` to the `WorkSample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enStartDate` to the `WorkSample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enTitle` to the `WorkSample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faEndDate` to the `WorkSample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faStartDate` to the `WorkSample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faTitle` to the `WorkSample` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `WorkSample_title_key` ON `worksample`;

-- AlterTable
ALTER TABLE `worksample` DROP COLUMN `description`,
    DROP COLUMN `endDate`,
    DROP COLUMN `fullDescription`,
    DROP COLUMN `startDate`,
    DROP COLUMN `title`,
    ADD COLUMN `enDescription` VARCHAR(300) NOT NULL DEFAULT '',
    ADD COLUMN `enEndDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `enFullDescription` VARCHAR(300) NOT NULL DEFAULT '',
    ADD COLUMN `enStartDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `enTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `faDescription` VARCHAR(300) NOT NULL DEFAULT '',
    ADD COLUMN `faEndDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `faFullDescription` VARCHAR(300) NOT NULL DEFAULT '',
    ADD COLUMN `faStartDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `faTitle` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `WorkSample_faTitle_key` ON `WorkSample`(`faTitle`);

-- CreateIndex
CREATE UNIQUE INDEX `WorkSample_enTitle_key` ON `WorkSample`(`enTitle`);
