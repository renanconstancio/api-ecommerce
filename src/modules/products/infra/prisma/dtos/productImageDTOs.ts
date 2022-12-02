// import { ProductsImages as ProductsImagesEntity } from '@prisma/client';

export type ProductImageDTOs = {
  id?: string;
  product_sku_id?: string | null;
  position: number;
  image: string;
  // image_lg?: string | unknown;
  // image_md?: string | unknown;
  // image_xs?: string | unknown;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
};
