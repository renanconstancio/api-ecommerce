import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '@modules/customers/domain/dtos/IUpdateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomersEntity } from '../infra/prisma/etities/Customers';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: IUpdateCustomer): Promise<CustomersEntity> {
    const customer = await this.customersRepository.findById(data.id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await this.customersRepository.findByEmail(
      data.email,
    );

    if (customerExists && data.email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    await this.customersRepository.update({ ...data });

    return customer;
  }
}
