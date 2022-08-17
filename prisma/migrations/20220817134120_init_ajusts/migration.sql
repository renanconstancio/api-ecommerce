-- CreateTable
CREATE TABLE `categories` (
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
CREATE TABLE `adresses` (
    `id` VARCHAR(36) NOT NULL,
    `customes_id` VARCHAR(36) NOT NULL,
    `recipient` VARCHAR(55) NOT NULL,
    `address` VARCHAR(65) NOT NULL,
    `number` VARCHAR(5) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `complement` VARCHAR(85) NULL,
    `reference` VARCHAR(85) NULL,
    `city` VARCHAR(45) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `zip_code` VARCHAR(9) NOT NULL,
    `status` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,

    INDEX `FK_CUSTOMERS`(`customes_id`),
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
CREATE TABLE `Sales` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `date_of_sale` DATETIME(6) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,

    INDEX `Sales_code_date_of_sale_idx`(`code`, `date_of_sale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_addresses` (
    `id` VARCHAR(36) NOT NULL,
    `sales_id` VARCHAR(36) NOT NULL,
    `customers_id` VARCHAR(36) NOT NULL,
    `addresses_id` VARCHAR(36) NOT NULL,
    `recipient` VARCHAR(55) NOT NULL,
    `address` VARCHAR(65) NOT NULL,
    `number` VARCHAR(5) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `complement` VARCHAR(85) NULL,
    `reference` VARCHAR(85) NULL,
    `city` VARCHAR(45) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `zip_code` VARCHAR(9) NOT NULL,

    INDEX `FK_ADRESSS`(`addresses_id`),
    INDEX `FK_CUSTOMER`(`customers_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_products` (
    `id` VARCHAR(36) NOT NULL,
    `sales_id` VARCHAR(36) NOT NULL,
    `produtcts_skus_id` VARCHAR(36) NOT NULL,

    INDEX `FK_SALE_PRODUCTS`(`sales_id`),
    INDEX `FK_SALE_PRODUCTS_SKU`(`produtcts_skus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_transactions` (
    `id` VARCHAR(36) NOT NULL,
    `sales_id` VARCHAR(36) NOT NULL,
    `payment_methods` VARCHAR(55) NOT NULL,
    `flag` VARCHAR(20) NOT NULL,
    `installment` TINYINT NOT NULL DEFAULT 0,
    `discounts` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,
    `discount_type` ENUM('price', 'percent') NOT NULL DEFAULT 'percent',

    INDEX `FK_SALE_TRANSATION`(`sales_id`),
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
    `visible` TINYINT NOT NULL DEFAULT 1,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `FK_cc7f32b7ab33c70b9e715afae84` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adresses` ADD CONSTRAINT `FK_CUSTOMERS` FOREIGN KEY (`customes_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_images` ADD CONSTRAINT `FK_d8ddccdc9bbd7345d257f6cb9fc` FOREIGN KEY (`product_sku_id`) REFERENCES `products_skus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_skus` ADD CONSTRAINT `FK_4a232ada01f43f6119ed6636985` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_addresses` ADD CONSTRAINT `FK_ADRESSS` FOREIGN KEY (`addresses_id`) REFERENCES `adresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_addresses` ADD CONSTRAINT `FK_CUSTOMER` FOREIGN KEY (`customers_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_products` ADD CONSTRAINT `FK_SALE_PRODUCTS` FOREIGN KEY (`sales_id`) REFERENCES `Sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_products` ADD CONSTRAINT `FK_SALE_PRODUCTS_SKU` FOREIGN KEY (`produtcts_skus_id`) REFERENCES `products_skus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_transactions` ADD CONSTRAINT `FK_SALE_TRANSATION` FOREIGN KEY (`sales_id`) REFERENCES `Sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
