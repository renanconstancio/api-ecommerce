/*
  Warnings:

  - You are about to alter the column `visible` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum("stores_visible")`.

*/
-- AlterTable
ALTER TABLE `stores` MODIFY `visible` ENUM('visible', 'invisible') NOT NULL DEFAULT 'visible';

-- CreateTable
CREATE TABLE `sales_status` (
    `id` VARCHAR(36) NOT NULL,
    `sales_id` VARCHAR(36) NOT NULL,
    `status` ENUM('ORDER_MADE', 'AWAITING_PAYMENT', 'PAYMENT_UNDER_REVIEW', 'PAYMENT_ACCEPT', 'PAYMENT_NOT_APPROVED', 'PAYMENT_NOT_MADE', 'ORDER_IN_PRODUCTION', 'ORDER_IN_STOCK_PICKING', 'ORDER_IN_TRANSPORT', 'AWAITING_WITHDRAWAL', 'ORDER_DELIVERED', 'ORDER_CANCELED') NOT NULL DEFAULT 'ORDER_MADE',
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `FK_SALE_STATUS`(`sales_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sales_status` ADD CONSTRAINT `FK_SALE_STATUS` FOREIGN KEY (`sales_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
