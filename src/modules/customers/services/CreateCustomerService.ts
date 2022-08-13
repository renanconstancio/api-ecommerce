import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';
import AppError from '@shared/errors/AppError';
import { Customers } from '@prisma/client';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: ICreateCustomer): Promise<Customers> {
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
