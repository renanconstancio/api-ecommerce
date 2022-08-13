import { Products } from '@prisma/client';

export interface IPaginateProduct {
  total: number;
  per_page: number;
  current_page: number;
  data: Products[];
}
