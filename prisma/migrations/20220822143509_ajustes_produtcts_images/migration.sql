-- DropForeignKey
ALTER TABLE `products_images` DROP FOREIGN KEY `FK_d8ddccdc9bbd7345d257f6cb9fc`;

-- AddForeignKey
ALTER TABLE `products_images` ADD CONSTRAINT `FK_PRODUCTS_IMAGES` FOREIGN KEY (`product_sku_id`) REFERENCES `products_skus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `products_images` RENAME INDEX `FK_d8ddccdc9bbd7345d257f6cb9fc` TO `FK_PRODUCTS_IMAGES`;
