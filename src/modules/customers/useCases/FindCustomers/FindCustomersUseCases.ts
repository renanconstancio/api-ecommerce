import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '@modules/customers/dtos/IShowCustomer';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindCustomersUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IShowCustomer): Promise<CustomersEntity> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}
