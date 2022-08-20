/*
  Warnings:

  - You are about to drop the column `sales_addresses_id` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `addresses_id` on the `sales_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `customers_id` on the `sales_addresses` table. All the data in the column will be lost.
  - Made the column `product_id` on table `products_skus` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `customers_id` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products_skus` DROP FOREIGN KEY `FK_4a232ada01f43f6119ed6636985`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `FK_SALE_ADRESSS`;

-- DropForeignKey
ALTER TABLE `sales_addresses` DROP FOREIGN KEY `FK_ADRESSS`;

-- DropForeignKey
ALTER TABLE `sales_addresses` DROP FOREIGN KEY `FK_CUSTOMER`;

-- DropForeignKey
ALTER TABLE `sales_products` DROP FOREIGN KEY `FK_SALE_PRODUCTS_SKU`;

-- DropForeignKey
ALTER TABLE `sales_transactions` DROP FOREIGN KEY `FK_SALE_TRANSATION`;

-- AlterTable
ALTER TABLE `products_skus` MODIFY `product_id` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `sales` DROP COLUMN `sales_addresses_id`,
    ADD COLUMN `customers_id` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `sales_addresses` DROP COLUMN `addresses_id`,
    DROP COLUMN `customers_id`;

-- CreateIndex
CREATE INDEX `FK_CUSTOMER` ON `sales`(`customers_id`);

-- CreateIndex
CREATE INDEX `FK_SALE_ADDRESS` ON `sales_addresses`(`sales_id`);

-- AddForeignKey
ALTER TABLE `products_skus` ADD CONSTRAINT `FK_4a232ada01f43f6119ed6636985` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `FK_CUSTOMER` FOREIGN KEY (`customers_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_addresses` ADD CONSTRAINT `FK_SALE_ADDRESS` FOREIGN KEY (`sales_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_products` ADD CONSTRAINT `FK_SKU_PRODUCTS` FOREIGN KEY (`produtcts_skus_id`) REFERENCES `products_skus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_transactions` ADD CONSTRAINT `FK_SALE_TRANSATIONS` FOREIGN KEY (`sales_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `sales_products` RENAME INDEX `FK_SALE_PRODUCTS_SKU` TO `FK_SKU_PRODUCTS`;

-- RenameIndex
ALTER TABLE `sales_transactions` RENAME INDEX `FK_SALE_TRANSATION` TO `FK_SALE_TRANSATIONS`;
