import 'reflect-metadata';
import IFakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesUseCases from '@modules/categories/useCases/CreateCategories/CreateCategoriesUseCases';
import DeleteCategoriesUseCases from '@modules/categories/useCases/DeleteCategories/DeleteCategoriesUseCases';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: IFakeCategoriesRepository;
let createCategories: CreateCategoriesUseCases;
let deleteCategory: DeleteCategoriesUseCases;

describe('DeleteCategoriesUseCases', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new IFakeCategoriesRepository();
    createCategories = new CreateCategoriesUseCases(fakeCategoriesRepository);
    deleteCategory = new DeleteCategoriesUseCases(fakeCategoriesRepository);
  });

  it('should be able to delete a category', async () => {
    const category = await createCategories.execute({
      category_id: null,
      name: 'Category A',
      description: '',
      keywords: '',
      position: 1,
    });

    const categoryDelete = await deleteCategory.execute({
      id: category.id,
    });

    expect(categoryDelete).toBeUndefined();
  });

  it('should not be able to delete a category', async () => {
    expect(
      deleteCategory.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
