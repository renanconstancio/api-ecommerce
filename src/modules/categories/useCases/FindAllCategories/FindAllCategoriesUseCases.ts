import { inject, injectable } from 'tsyringe';
import { IPaginateCategory } from '@modules/categories/dtos/IPaginateCategory';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

interface SearchParams {
  page: number;
  limit: number;
  name: string;
}

@injectable()
export default class FindAllCategoriesUseCases {
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
    return await this.categoriesRepository.findAll({
      page,
      skip,
      take,
      name,
    });
  }
}
