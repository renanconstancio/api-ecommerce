import { ISalesCustomersRepository } from '@modules/sales/repositories/ISalesCustomersRepository';
import { Customers } from '@modules/customers/infra/prisma/etities/Customers';
import { prisma } from '@shared/infra/prisma';

export default class SalesCustomersRepository
  implements ISalesCustomersRepository
{
  async findById(id: string): Promise<Customers | null> {
    return await prisma.customers.findUnique({
      where: { id },
    });
  }
}
