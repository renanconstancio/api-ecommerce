import 'reflect-metadata';
import DeleteCategoryService from './DeleteCategoryService';
import FakeCategoriesRepository from '@modules/categories/domain/repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createDeleteCategory: CreateCategoryService;
let deleteCategory: DeleteCategoryService;

describe('DeleteCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createDeleteCategory = new CreateCategoryService(fakeCategoriesRepository);
    deleteCategory = new DeleteCategoryService(fakeCategoriesRepository);
  });

  it('should be able to delete a category', async () => {
    const category = await createDeleteCategory.execute({
      name: 'Category A',
      description: '',
      keywords: '',
      position: 1,
    });

    console.log(category.id);

    expect(
      await deleteCategory.execute({
        id: category.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
