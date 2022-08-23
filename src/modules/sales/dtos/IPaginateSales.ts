import { Sales } from '@modules/sales/infra/prisma/entities/Sales';

export interface IPaginateSales {
  total: number;
  per_page: number;
  current_page: number;
  data: Sales[];
}
