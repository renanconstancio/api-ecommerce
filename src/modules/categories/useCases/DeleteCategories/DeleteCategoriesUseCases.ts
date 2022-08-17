import { inject, injectable } from 'tsyringe';
import { IDeleteCategory } from '@modules/categories/dtos/IDeleteCategory';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ id }: IDeleteCategory): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    await this.categoriesRepository.remove(id);
  }
}
