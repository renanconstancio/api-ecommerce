import { inject, injectable } from 'tsyringe';
import { Customers } from '@modules/customers/infra/prisma/etities/Customers';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { IFindCustomer } from '@modules/customers/dtos/IFindCustomer';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindCustomersUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IFindCustomer): Promise<Customers> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}
