// import { ProductsSkus as ProductsSkusEntity } from '@prisma/client';
import { ProductsImages } from './ProductsImages';

export type ProductsSkus = {
  id: string;
  product_id: string;
  sku: string;
  price: number;
  quantity: number;
  cost_price: number;
  sale_price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  images?: ProductsImages[];
};
