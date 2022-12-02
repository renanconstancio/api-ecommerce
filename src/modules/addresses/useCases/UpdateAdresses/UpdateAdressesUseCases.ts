import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { IAdressesRepository } from '@modules/addresses/repositories/IAdressesRepository';
import { IUpdateAdresses } from '@modules/addresses/dtos/IUpdateAdresses';
import { Adresses } from '@modules/addresses/infra/prisma/entities/Adresses';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateAdressesUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository,
  ) {}

  async execute(data: IUpdateAdresses): Promise<Adresses> {
    const emailExists = await this.customersRepository.findById({
      id: data.customers_id,
    });

    if (emailExists) {
      throw new AppError('the customer must be mandatory.');
    }

    return await this.adressesRepository.update({
      ...data,
    });
  }
}
