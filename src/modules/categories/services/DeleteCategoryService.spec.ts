import 'reflect-metadata';
import DeleteCategoryService from './DeleteCategoryService';
import FakeCategoriesRepository from '@modules/categories/domain/repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';
// import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategory: CreateCategoryService;
let deleteCategory: DeleteCategoryService;

describe('DeleteCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
    deleteCategory = new DeleteCategoryService(fakeCategoriesRepository);
  });

  it('should be able to delete a category', async () => {
    const category = await createCategory.execute({
      name: 'Category A',
      description: '',
      keywords: '',
      position: 1,
      category_id: '',
    });

    expect(
      await deleteCategory.execute({
        id: category.id,
      }),
    ).toHaveReturned();

    // expect(deleteCategory).rejects.toBeInstanceOf(AppError);
  });
});
