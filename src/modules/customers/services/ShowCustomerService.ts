import { inject, injectable } from 'tsyringe';
import { Customers } from '@prisma/client';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IShowCustomer): Promise<Customers> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}
