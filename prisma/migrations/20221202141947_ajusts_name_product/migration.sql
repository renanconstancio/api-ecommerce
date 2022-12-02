/*
  Warnings:

  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(105) NOT NULL;
