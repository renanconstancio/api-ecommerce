import { inject, injectable } from 'tsyringe';
import { IPaginateCategory } from '../domain/models/IPaginateCategory';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';

interface SearchParams {
  page: number;
  limit: number;
  name: string;
}

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    page,
    limit,
    name,
  }: SearchParams): Promise<IPaginateCategory> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.categoriesRepository.findAll({
      page,
      skip,
      take,
      name,
    });

    return customers;
  }
}
