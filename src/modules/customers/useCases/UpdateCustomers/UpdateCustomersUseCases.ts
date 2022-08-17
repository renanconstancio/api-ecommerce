import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { IUpdateCustomer } from '@modules/customers/dtos/IUpdateCustomer';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateCustomersUseCases {
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
