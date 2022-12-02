import { inject, injectable } from 'tsyringe';
import { IAdressesRepository } from '@modules/addresses/repositories/IAdressesRepository';
import { IPaginateAdresses } from '@modules/addresses/dtos/IPaginateAdresses';

interface SearchParams {
  page: number;
  limit: number;
  customers_id: string;
}

@injectable()
export default class FindAllAdressesUseCases {
  constructor(
    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository,
  ) {}

  async execute({
    page,
    limit,
    customers_id,
  }: SearchParams): Promise<IPaginateAdresses> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const adresses = await this.adressesRepository.findAll({
      page,
      skip,
      take,
      customers_id,
    });

    return adresses;
  }
}
