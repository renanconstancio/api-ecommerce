import { inject, injectable } from 'tsyringe';
import { Category } from '@prisma/client';
import { ICreateCategory } from '../domain/models/ICreateCategory';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: ICreateCategory): Promise<Category> {
    const nameExists = await this.categoriesRepository.findByName(data.name);

    if (nameExists) {
      throw new AppError('category name already used.');
    }

    const category = await this.categoriesRepository.create({ ...data });

    return category;
  }
}
