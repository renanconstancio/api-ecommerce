/*
  Warnings:

  - You are about to drop the column `deleated_at` on the `sotres` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sotres` DROP COLUMN `deleated_at`,
    ADD COLUMN `deleted_at` DATETIME(6) NULL;
