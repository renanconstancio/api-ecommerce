import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}
