// import { Products as ProductsEntity } from '@prisma/client';
import { ProductsSkus } from './ProductsSkus';

export type Products = {
  id: string;
  name: string;
  keywords: string;
  visible: string;
  description: string;
  description_text: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  skus?: ProductsSkus[];
};
