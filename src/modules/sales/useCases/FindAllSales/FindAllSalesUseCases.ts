import { inject, injectable } from 'tsyringe';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { IPaginateSales } from '@modules/sales/dtos/IPaginateSales';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class FindAllSalesUseCases {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  async execute({ page, limit }: SearchParams): Promise<IPaginateSales> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const sales = await this.salesRepository.findAll({
      page,
      skip,
      take,
    });

    return sales;
  }
}
