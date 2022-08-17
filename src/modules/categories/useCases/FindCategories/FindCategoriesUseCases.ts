import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';
import { IShowCategory } from '@modules/categories/dtos/IShowCategory';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ id }: IShowCategory): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    return category;
  }
}
