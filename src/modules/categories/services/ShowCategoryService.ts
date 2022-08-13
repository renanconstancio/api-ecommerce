import { inject, injectable } from 'tsyringe';
import { Category } from '@prisma/client';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IShowCategory } from '../domain/models/IShowCategory';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ id }: IShowCategory): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    return category;
  }
}
