import { inject, injectable } from 'tsyringe';
import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';
import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: ICreateCategory): Promise<CategoryEntity> {
    const nameExists = await this.categoriesRepository.findByName(data.name);

    if (nameExists) {
      throw new AppError('category name already used.');
    }

    const category = await this.categoriesRepository.create({ ...data });

    return category;
  }
}
