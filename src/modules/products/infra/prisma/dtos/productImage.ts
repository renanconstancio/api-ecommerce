// import { ProductsImages as ProductsImagesEntity } from '@prisma/client';

export type ProductImage = {
  id?: string;
  product_sku_id?: string | null;
  position: number;
  image: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
