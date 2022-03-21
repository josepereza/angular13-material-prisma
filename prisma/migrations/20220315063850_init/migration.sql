-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL DEFAULT '',
    `createat` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `content` TEXT NULL,
    `published` BIT(1) NOT NULL DEFAULT b'0',
    `authorid` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_post_user`(`authorid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `bio` TEXT NULL,
    `userid` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `userid`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NULL,
    `image_name` VARCHAR(255) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `fk_post_user` FOREIGN KEY (`authorid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `fk_profile_user` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
