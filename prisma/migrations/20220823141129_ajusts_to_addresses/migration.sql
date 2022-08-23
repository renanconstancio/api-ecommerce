/*
  Warnings:

  - You are about to drop the column `status` on the `adresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `adresses` DROP COLUMN `status`,
    ADD COLUMN `for_sales` ENUM('yes', 'no') NOT NULL DEFAULT 'yes';
