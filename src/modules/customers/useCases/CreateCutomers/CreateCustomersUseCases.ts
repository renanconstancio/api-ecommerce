import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '@modules/customers/dtos/ICreateCustomer';
import { ICustomersHashRepository } from '@modules/customers/repositories/ICustomersHashRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateCustomersUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: ICustomersHashRepository,
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
