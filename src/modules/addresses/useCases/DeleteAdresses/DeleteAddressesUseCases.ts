import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { IDeleteCustomer } from '@modules/customers/dtos/IDeleteCustomer';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteCustomersUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(id);
  }
}
