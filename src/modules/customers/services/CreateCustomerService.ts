import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '@modules/customers/domain/dtos/ICreateCustomer';
import { IHashProvider } from '@modules/customers/providers/HashProvider/dtos/IHashPovider';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: ICreateCustomer): Promise<CustomersEntity> {
    const emailExists = await this.customersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const customer = await this.customersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return customer;
  }
}
