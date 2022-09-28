/*
  Warnings:

  - You are about to drop the column `date_of_sale` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `sale_price` on the `products_skus` table. All the data in the column will be lost.
  - Added the required column `date_of_order` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `orders_code_date_of_sale_idx` ON `orders`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `date_of_sale`,
    ADD COLUMN `date_of_order` DATETIME(6) NOT NULL;

-- AlterTable
ALTER TABLE `products_skus` DROP COLUMN `sale_price`,
    ADD COLUMN `order_price` DECIMAL(10, 0) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `orders_code_date_of_order_idx` ON `orders`(`code`, `date_of_order`);
