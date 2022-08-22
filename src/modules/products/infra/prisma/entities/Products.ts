import { Products as ProductsEntity } from '@prisma/client';
import { ProductsSkus } from './ProductsSkus';

export type Products = {
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
} & ProductsEntity;
