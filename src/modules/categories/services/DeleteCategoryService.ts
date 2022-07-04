import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteCategory } from '../domain/models/IDeleteCategory';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';

@injectable()
export default class DeleteCategoryService {
  constructor(
    @inject('CategorysRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ id }: IDeleteCategory): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    await this.categoriesRepository.remove(category);
  }
}
