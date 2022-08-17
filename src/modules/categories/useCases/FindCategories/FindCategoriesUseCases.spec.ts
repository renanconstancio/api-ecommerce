import 'reflect-metadata';
import IFakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesUseCases from '@modules/categories/useCases/CreateCategories/CreateCategoriesUseCases';
import FindCategoriesUseCases from '@modules/categories/useCases/FindCategories/FindCategoriesUseCases';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: IFakeCategoriesRepository;
let findCategoryService: FindCategoriesUseCases;
let createCategory: CreateCategoriesUseCases;

describe('FindCategoriesUseCases', () => {
  beforeEach(() => {
    fakeCustomersRepository = new IFakeCategoriesRepository();
    findCategoryService = new FindCategoriesUseCases(fakeCustomersRepository);
    createCategory = new CreateCategoriesUseCases(fakeCustomersRepository);
  });

  it('must be able to list the categories', async () => {
    const category = await createCategory.execute({
      name: 'Category A',
      description: '',
      keywords: '',
      position: 1,
      category_id: '',
    });
    expect(category).toHaveProperty('id');
  });

  it("shouldn't be able to list categories if it doesn't exist", async () => {
    expect(
      findCategoryService.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
