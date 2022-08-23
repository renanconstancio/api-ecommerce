/*
  Warnings:

  - You are about to drop the column `customes_id` on the `adresses` table. All the data in the column will be lost.
  - Added the required column `customers_id` to the `adresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `adresses` DROP FOREIGN KEY `FK_CUSTOMERS`;

-- AlterTable
ALTER TABLE `adresses` DROP COLUMN `customes_id`,
    ADD COLUMN `customers_id` VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE INDEX `FK_CUSTOMERS` ON `adresses`(`customers_id`);

-- AddForeignKey
ALTER TABLE `adresses` ADD CONSTRAINT `FK_CUSTOMERS` FOREIGN KEY (`customers_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
