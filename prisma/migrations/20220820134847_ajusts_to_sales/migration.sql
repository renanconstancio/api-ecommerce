/*
  Warnings:

  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sales_products` DROP FOREIGN KEY `FK_SALE_PRODUCTS`;

-- DropForeignKey
ALTER TABLE `sales_transactions` DROP FOREIGN KEY `FK_SALE_TRANSATION`;

-- DropTable
DROP TABLE `Sales`;

-- CreateTable
CREATE TABLE `sales` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `date_of_sale` DATETIME(6) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,
    `deleted_at` DATETIME(6) NULL,
    `sales_addresses_id` VARCHAR(36) NOT NULL,

    INDEX `sales_code_date_of_sale_idx`(`code`, `date_of_sale`),
    INDEX `FK_CUSTOMER`(`sales_addresses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `FK_SALE_ADRESSS` FOREIGN KEY (`sales_addresses_id`) REFERENCES `sales_addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_products` ADD CONSTRAINT `FK_SALE_PRODUCTS` FOREIGN KEY (`sales_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_transactions` ADD CONSTRAINT `FK_SALE_TRANSATION` FOREIGN KEY (`sales_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
