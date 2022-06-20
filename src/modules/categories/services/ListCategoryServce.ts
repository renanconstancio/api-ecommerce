import { inject, injectable } from 'tsyringe';
import { IPaginateCategory } from '../domain/models/IPaginateCategory';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPaginateCategory> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.categoriesRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}
