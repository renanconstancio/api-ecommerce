import 'reflect-metadata';
import IFakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesUseCase from '@modules/categories/useCases/CreateCategories/CreateCategoriesUseCases';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: IFakeCategoriesRepository;
let createCategory: CreateCategoriesUseCase;

describe('CreateCategoriesUseCases', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new IFakeCategoriesRepository();
    createCategory = new CreateCategoriesUseCase(fakeCategoriesRepository);
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
