/*
  Warnings:

  - You are about to alter the column `for_orders` on the `adresses` table. The data in that column could be lost. The data in that column will be cast from `Enum("adresses_for_orders")` to `TinyInt`.
  - You are about to alter the column `visible` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Enum("products_visible")` to `TinyInt`.
  - You are about to alter the column `visible` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Enum("stores_visible")` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `adresses` MODIFY `for_orders` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `products` MODIFY `visible` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `stores` MODIFY `visible` BOOLEAN NOT NULL DEFAULT true;
