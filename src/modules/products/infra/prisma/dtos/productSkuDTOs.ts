import { Decimal } from '@prisma/client/runtime';
import { ProductImageDTOs } from './productImageDTOs';

export type ProductSkuDTOs = {
  id?: string;
  product_id?: string;
  sku: string;
  codebar: string;
  quantity: number;
  price: Decimal;
  cost_price: Decimal;
  sale_price: Decimal;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | string | null;
  images?: ProductImageDTOs[];
};
