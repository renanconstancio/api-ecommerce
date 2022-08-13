import 'reflect-metadata';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoriesRepository from '@modules/categories/domain/repositories/fakes/FakeCategoriesRepository';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategory: CreateCategoryService;

describe('CreateCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategory.execute({
      name: 'Category A',
      description: '',
      keywords: '',
      position: 1,
      category_id: '',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create two category with the same name', async () => {
    await createCategory.execute({
      name: 'Category A',
      description: '',
      keywords: '',
      position: 1,
      category_id: '',
    });

    expect(
      createCategory.execute({
        name: 'Category A',
        description: '',
        keywords: '',
        position: 1,
        category_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
