import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCategory } from '../domain/models/ICreateCategory';
import { ICategory } from '../domain/models/ICategory';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    category_id,
    name,
    description,
    keywords,
    position,
  }: ICreateCategory): Promise<ICategory> {
    const nameExists = await this.categoriesRepository.findByName(name);

    if (nameExists) {
      throw new AppError('category name already used.');
    }

    const category = await this.categoriesRepository.create({
      category_id,
      name,
      description,
      keywords,
      position,
    });

    return category;
  }
}
