-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(36) NOT NULL,
    `category_id` VARCHAR(36) NULL,
    `name` VARCHAR(255) NOT NULL,
    `keywords` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `FK_cc7f32b7ab33c70b9e715afae84`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(155) NOT NULL,
    `keywords` VARCHAR(255) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(505) NOT NULL,
    `description_text` TEXT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_images` (
    `id` VARCHAR(36) NOT NULL,
    `product_sku_id` VARCHAR(36) NULL,
    `image` VARCHAR(48) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `FK_PRODUCTS_IMAGES`(`product_sku_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_skus` (
    `id` VARCHAR(36) NOT NULL,
    `product_id` VARCHAR(36) NOT NULL,
    `sku` VARCHAR(20) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `cost_price` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `sale_price` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `FK_PRODUCTS_SKUS`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
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
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `FK_cc7f32b7ab33c70b9e715afae84` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_images` ADD CONSTRAINT `FK_PRODUCTS_IMAGES` FOREIGN KEY (`product_sku_id`) REFERENCES `products_skus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_skus` ADD CONSTRAINT `FK_PRODUCTS_SKUS` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
