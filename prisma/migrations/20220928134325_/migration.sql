/*
  Warnings:

  - You are about to drop the column `order_price` on the `products_skus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products_skus` DROP COLUMN `order_price`,
    ADD COLUMN `sale_price` DECIMAL(10, 0) NOT NULL DEFAULT 0;
