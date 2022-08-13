import { Stores } from '@prisma/client';

export interface IPaginateStore {
  total: number;
  per_page: number;
  current_page: number;
  data: Stores[];
}
