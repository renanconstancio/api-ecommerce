/*
  Warnings:

  - Added the required column `codebar` to the `products_skus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products_skus` ADD COLUMN `codebar` VARCHAR(32) NOT NULL;
