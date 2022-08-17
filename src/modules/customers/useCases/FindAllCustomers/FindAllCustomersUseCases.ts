import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { IPaginateCustomer } from '@modules/customers/dtos/IPaginateCustomer';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class FindAllCustomersUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ page, limit }: SearchParams): Promise<IPaginateCustomer> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}
