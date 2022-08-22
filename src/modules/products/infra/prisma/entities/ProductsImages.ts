import { ProductsImages as ProductsImagesEntity } from '@prisma/client';

export type ProductsImages = {
  id: string;
  product_sku_id: string | null;
  image: string;
  position: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
} & ProductsImagesEntity;
