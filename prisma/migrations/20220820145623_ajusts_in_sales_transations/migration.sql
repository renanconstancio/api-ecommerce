-- AlterTable
ALTER TABLE `sales_transactions` ADD COLUMN `price_increase` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    ADD COLUMN `total_price` DECIMAL(10, 0) NOT NULL DEFAULT 0;
