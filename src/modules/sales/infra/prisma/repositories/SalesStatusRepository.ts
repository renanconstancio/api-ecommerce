import { ICreateSalesStatus } from '@modules/sales/dtos/ICreateSalesStatus';
import { ISalesStatusRepository } from '@modules/sales/repositories/ISalesStatusRepository';
import { SalesStatus } from '@modules/sales/infra/prisma/entities/SalesStatus';
import { prisma } from '@shared/infra/prisma';

export default class SalesStatusRepository implements ISalesStatusRepository {
  async create({ sales_id, status }: ICreateSalesStatus): Promise<SalesStatus> {
    return prisma.salesStatus.create({
      data: {
        sales_id,
        status,
      },
    }) as SalesStatus;
  }
}
