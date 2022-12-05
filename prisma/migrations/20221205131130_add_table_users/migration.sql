-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `type` ENUM('admin', 'user', 'root') NOT NULL DEFAULT 'user',
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(85) NOT NULL,
    `reset_password` VARCHAR(36) NULL,
    `first_name` VARCHAR(55) NULL,
    `last_name` VARCHAR(30) NULL,
    `phone` VARCHAR(20) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
