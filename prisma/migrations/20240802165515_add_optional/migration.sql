-- AlterTable
ALTER TABLE `worksample` MODIFY `pictures` VARCHAR(191) NULL,
    MODIFY `link` VARCHAR(191) NULL,
    MODIFY `technologys` VARCHAR(191) NULL,
    MODIFY `enDescription` VARCHAR(191) NULL DEFAULT '',
    MODIFY `enEndDate` VARCHAR(191) NULL,
    MODIFY `enFullDescription` VARCHAR(191) NULL DEFAULT '',
    MODIFY `enStartDate` VARCHAR(191) NULL,
    MODIFY `enTitle` VARCHAR(191) NULL,
    MODIFY `faDescription` VARCHAR(191) NULL DEFAULT '',
    MODIFY `faEndDate` VARCHAR(191) NULL,
    MODIFY `faFullDescription` VARCHAR(191) NULL DEFAULT '',
    MODIFY `faStartDate` VARCHAR(191) NULL,
    MODIFY `faTitle` VARCHAR(191) NULL;
