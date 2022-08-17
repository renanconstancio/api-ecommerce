import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';

export interface IPaginateCategory {
  total: number;
  per_page: number;
  current_page: number;
  data: CategoryEntity[];
}
