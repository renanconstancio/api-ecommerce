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

  async execute({
    id,
    name,
    description,
    keywords,
    position,
    category_id,
  }: IUpdateCategory): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists && name !== category.name) {
      throw new AppError('There is already one category with this name.');
    }

    category.id = id;
    category.category_id = category_id;
    category.name = name;
    category.description = description;
    category.keywords = keywords;
    category.position = position;

    await this.categoriesRepository.update(category);

    return category;
  }
}
