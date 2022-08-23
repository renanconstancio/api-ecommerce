import { ICreateSalesAddresses } from '@modules/sales/dtos/ICreateSalesAddresses';
import { SalesAddresses } from '@modules/sales/infra/prisma/entities/SalesAddresses';

export interface ISalesAddressesRepository {
  create(data: ICreateSalesAddresses): Promise<SalesAddresses | null>;
}
