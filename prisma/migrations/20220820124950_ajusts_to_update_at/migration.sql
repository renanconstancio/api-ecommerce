-- AlterTable
ALTER TABLE `Sales` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `adresses` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `customers` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products_images` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products_skus` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sales_transactions` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `stores` MODIFY `opening_hours` VARCHAR(155) NULL,
    MODIFY `complement` VARCHAR(45) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
