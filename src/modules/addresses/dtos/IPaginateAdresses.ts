import { Adresses } from '@modules/addresses/infra/prisma/entities/Adresses';

export interface IPaginateAdresses {
  total: number;
  per_page: number;
  current_page: number;
  data: Adresses[];
}
