import { Category } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUpdateCategory } from '../domain/models/IUpdateCategory';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';

@injectable()
export default class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: IUpdateCategory): Promise<Category> {
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
