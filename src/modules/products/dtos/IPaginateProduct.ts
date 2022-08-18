import { ProductsEntity } from '@modules/products/prisma/entities/Products';

export interface IPaginateProduct {
  total: number;
  per_page: number;
  current_page: number;
  data: ProductsEntity[];
}
