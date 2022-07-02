import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IShowCategory } from '../domain/models/IShowCategory';
import { ICategory } from '../domain/models/ICategory';

@injectable()
export default class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id }: IShowCategory): Promise<ICategory> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    return category;
  }
}
