import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '@modules/customers/domain/dtos/IShowCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowCustomerService {
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
