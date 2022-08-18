import { Products, ProductsSkus } from '@prisma/client';

export type ProductsEntity = {
  id: string;
  name: string;
  keywords: string;
  description: string;
  description_text: string | null;
  visible: 'visible' | 'invisible';
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  skus?: ProductsSkus[];
} & Products;
