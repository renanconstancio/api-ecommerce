import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { Customers } from '@prisma/client';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: IUpdateCustomer): Promise<Customers> {
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
