-- AlterTable
ALTER TABLE `sales_products` ADD COLUMN `price_paid` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;
