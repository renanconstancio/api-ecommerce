import { ProductsSkus as ProductsSkusEntity } from '@prisma/client';
import { ProductsImages } from './ProductsImages';

export type ProductsSkus = {
  images?: ProductsImages[] | undefined;
} & ProductsSkusEntity;
