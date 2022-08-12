-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(36) NOT NULL,
    `category_id` VARCHAR(36) NULL,
    `name` VARCHAR(255) NOT NULL,
    `keywords` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,

    INDEX `FK_cc7f32b7ab33c70b9e715afae84`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(105) NOT NULL,
    `email` VARCHAR(85) NOT NULL,
    `password` VARCHAR(86) NOT NULL,
    `cpf` VARCHAR(20) NULL,
    `cnpj` VARCHAR(22) NULL,
    `phone` VARCHAR(20) NULL,
    `avatar` VARCHAR(41) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,
    `birth_date` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,
    `keywords` VARCHAR(255) NOT NULL,
    `visible` ENUM('visible', 'invisible') NOT NULL DEFAULT 'invisible',
    `description_text` TEXT NULL,
    `description` VARCHAR(505) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_images` (
    `id` VARCHAR(36) NOT NULL,
    `product_sku_id` VARCHAR(36) NULL,
    `image` VARCHAR(42) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,

    INDEX `FK_d8ddccdc9bbd7345d257f6cb9fc`(`product_sku_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_skus` (
    `id` VARCHAR(36) NOT NULL,
    `sku` VARCHAR(20) NOT NULL,
    `price` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,
    `cost_price` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `sale_price` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `product_id` VARCHAR(36) NULL,

    INDEX `FK_4a232ada01f43f6119ed6636985`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sotres` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(105) NOT NULL,
    `fantasy_name` VARCHAR(105) NOT NULL,
    `email` VARCHAR(55) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `opening_hours` VARCHAR(155) NOT NULL,
    `address` VARCHAR(55) NOT NULL,
    `number` VARCHAR(4) NOT NULL,
    `district` VARCHAR(35) NOT NULL,
    `complement` VARCHAR(45) NOT NULL,
    `city` VARCHAR(35) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `zip_code` VARCHAR(9) NOT NULL,
    `visible` TINYINT NOT NULL DEFAULT 1,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `FK_cc7f32b7ab33c70b9e715afae84` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products_images` ADD CONSTRAINT `FK_d8ddccdc9bbd7345d257f6cb9fc` FOREIGN KEY (`product_sku_id`) REFERENCES `products_skus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products_skus` ADD CONSTRAINT `FK_4a232ada01f43f6119ed6636985` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
