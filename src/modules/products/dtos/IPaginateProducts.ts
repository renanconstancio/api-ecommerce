import { Products } from '@modules/products/infra/prisma/entities/Products';

export interface IPaginateProducts {
  total: number;
  per_page: number;
  current_page: number;
  data: Products[];
}
