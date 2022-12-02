import { inject, injectable } from 'tsyringe';
import { Adresses } from '@modules/addresses/infra/prisma/entities/Adresses';
import { ICreateAdresses } from '@modules/addresses/dtos/ICreateAdresses';
import { IAdressesRepository } from '@modules/addresses/repositories/IAdressesRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateAdressesUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository,
  ) {}

  async execute(data: ICreateAdresses): Promise<Adresses> {
    const customerExists = await this.customersRepository.findById({
      id: data.customers_id,
    });

    if (!customerExists) {
      throw new AppError('the customer must be mandatory.');
    }

    return await this.adressesRepository.create({
      ...data,
    });
  }
}
