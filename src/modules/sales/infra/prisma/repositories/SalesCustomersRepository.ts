import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import { ISalesCustomersRepository } from '@modules/sales/repositories/ISalesCustomersRepository';
import { prisma } from '@shared/infra/prisma';

export default class SalesCustomersRepository
  implements ISalesCustomersRepository
{
  async findById(id: string): Promise<CustomersEntity | null> {
    return await prisma.customers.findUnique({
      where: { id },
    });
  }
}
