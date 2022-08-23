import { ISalesAddressesRepository } from '@modules/sales/repositories/ISalesAddressesRepository';
import { SalesAddresses } from '@modules/sales/infra/prisma/entities/SalesAddresses';
import { prisma } from '@shared/infra/prisma';
import { ICreateSalesAddresses } from '@modules/sales/dtos/ICreateSalesAddresses';

export default class SalesAddessesRepository
  implements ISalesAddressesRepository
{
  async create({
    sales_id,
    address,
    city,
    district,
    number,
    recipient,
    state,
    zip_code,
    complement,
    reference,
  }: ICreateSalesAddresses): Promise<SalesAddresses> {
    return await prisma.salesAddresses.create({
      data: {
        sales_id,
        address,
        city,
        district,
        number,
        recipient,
        state,
        zip_code,
        complement,
        reference,
      },
    });
  }
}
