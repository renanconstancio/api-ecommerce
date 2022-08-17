import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { IUpdateCategory } from '@modules/categories/dtos/IUpdateCategory';
import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: IUpdateCategory): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findById(data.id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    const categoryExists = await this.categoriesRepository.findByName(
      data.name,
    );

    if (categoryExists && data.name !== category.name) {
      throw new AppError('There is already one category with this name.');
    }

    await this.categoriesRepository.update({ ...data });

    return category;
  }
}
