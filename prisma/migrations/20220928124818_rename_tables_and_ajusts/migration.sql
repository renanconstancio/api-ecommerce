/*
  Warnings:

  - You are about to drop the column `for_sales` on the `adresses` table. All the data in the column will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `FK_CUSTOMER`;

-- DropForeignKey
ALTER TABLE `sales_addresses` DROP FOREIGN KEY `FK_SALE_ADDRESS`;

-- DropForeignKey
ALTER TABLE `sales_products` DROP FOREIGN KEY `FK_SALE_PRODUCTS`;

-- DropForeignKey
ALTER TABLE `sales_products` DROP FOREIGN KEY `FK_SKU_PRODUCTS`;

-- DropForeignKey
ALTER TABLE `sales_status` DROP FOREIGN KEY `FK_SALE_STATUS`;

-- DropForeignKey
ALTER TABLE `sales_transactions` DROP FOREIGN KEY `FK_SALE_TRANSATIONS`;

-- AlterTable
ALTER TABLE `adresses` DROP COLUMN `for_sales`,
    ADD COLUMN `for_orders` ENUM('yes', 'no') NOT NULL DEFAULT 'yes';

-- DropTable
DROP TABLE `sales`;

-- DropTable
DROP TABLE `sales_addresses`;

-- DropTable
DROP TABLE `sales_products`;

-- DropTable
DROP TABLE `sales_status`;

-- DropTable
DROP TABLE `sales_transactions`;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `date_of_sale` DATETIME(6) NOT NULL,
    `customers_id` VARCHAR(36) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `deleted_at` DATETIME(6) NULL,

    INDEX `FK_CUSTOMER`(`customers_id`),
    INDEX `orders_code_date_of_sale_idx`(`code`, `date_of_sale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_addresses` (
    `id` VARCHAR(36) NOT NULL,
    `orders_id` VARCHAR(36) NOT NULL,
    `recipient` VARCHAR(55) NOT NULL,
    `address` VARCHAR(65) NOT NULL,
    `number` VARCHAR(5) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `complement` VARCHAR(85) NULL,
    `reference` VARCHAR(85) NULL,
    `city` VARCHAR(45) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `zip_code` VARCHAR(9) NOT NULL,

    INDEX `FK_ORDER_ADDRESS`(`orders_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_products` (
    `id` VARCHAR(36) NOT NULL,
    `orders_id` VARCHAR(36) NOT NULL,
    `produtcts_skus_id` VARCHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price_paid` DECIMAL(10, 0) NOT NULL DEFAULT 0,

    INDEX `FK_ORDER_PRODUCTS`(`orders_id`),
    INDEX `FK_SKU_PRODUCTS`(`produtcts_skus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_transactions` (
    `id` VARCHAR(36) NOT NULL,
    `orders_id` VARCHAR(36) NOT NULL,
    `payment_methods` VARCHAR(55) NOT NULL,
    `flag` VARCHAR(20) NOT NULL,
    `installment` TINYINT NOT NULL DEFAULT 0,
    `discounts` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `total_price` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `price_increase` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `deleted_at` DATETIME(6) NULL,
    `discount_type` ENUM('price', 'percent') NOT NULL DEFAULT 'percent',

    INDEX `FK_ORDER_TRANSATIONS`(`orders_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_status` (
    `id` VARCHAR(36) NOT NULL,
    `orders_id` VARCHAR(36) NOT NULL,
    `status` ENUM('ORDER_MADE', 'AWAITING_PAYMENT', 'PAYMENT_UNDER_REVIEW', 'PAYMENT_ACCEPT', 'PAYMENT_NOT_APPROVED', 'PAYMENT_NOT_MADE', 'ORDER_IN_PRODUCTION', 'ORDER_IN_STOCK_PICKING', 'ORDER_IN_TRANSPORT', 'AWAITING_WITHDRAWAL', 'ORDER_DELIVERED', 'ORDER_CANCELED') NOT NULL DEFAULT 'ORDER_MADE',
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `FK_ORDER_STATUS`(`orders_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_CUSTOMER` FOREIGN KEY (`customers_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_addresses` ADD CONSTRAINT `FK_ORDER_ADDRESS` FOREIGN KEY (`orders_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `FK_ORDER_PRODUCTS` FOREIGN KEY (`orders_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_products` ADD CONSTRAINT `FK_SKU_PRODUCTS` FOREIGN KEY (`produtcts_skus_id`) REFERENCES `products_skus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_transactions` ADD CONSTRAINT `FK_ORDER_TRANSATIONS` FOREIGN KEY (`orders_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_status` ADD CONSTRAINT `FK_ORDER_STATUS` FOREIGN KEY (`orders_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
