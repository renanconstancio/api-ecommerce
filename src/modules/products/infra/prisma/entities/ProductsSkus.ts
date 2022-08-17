import { Prisma, ProductsImages, ProductsSkus } from '@prisma/client';

export type ProductsSkusEntity = {
  id: string;
  product_id: string | null;
  sku: string;
  price: Prisma.Decimal;
  cost_price: Prisma.Decimal;
  sale_price: Prisma.Decimal;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  images?: ProductsImages[];
} & ProductsSkus;
