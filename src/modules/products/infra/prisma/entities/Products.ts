import { Products as ProductsEntity } from '@prisma/client';
import { ProductsSkus } from './ProductsSkus';

export type Products = {
  skus?: ProductsSkus[];
} & ProductsEntity;
