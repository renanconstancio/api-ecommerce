import { ICreateSalesStatus } from '@modules/sales/dtos/ICreateSalesStatus';
import { SalesStatus } from '@modules/sales/infra/prisma/entities/SalesStatus';

export interface ISalesStatusRepository {
  create(data: ICreateSalesStatus): Promise<SalesStatus>;
}
