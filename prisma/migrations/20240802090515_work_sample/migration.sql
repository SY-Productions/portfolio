-- CreateTable
CREATE TABLE `WorkSample` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isWeb` BOOLEAN NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `fullDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `pictures` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `technologys` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WorkSample_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
