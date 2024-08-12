/*
  Warnings:

  - The primary key for the `education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `education` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[from]` on the table `Education` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `education` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- CreateIndex
CREATE UNIQUE INDEX `Education_from_key` ON `Education`(`from`);
