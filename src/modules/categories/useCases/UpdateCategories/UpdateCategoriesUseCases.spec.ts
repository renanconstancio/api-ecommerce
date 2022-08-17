import 'reflect-metadata';
import IFakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import UpdateCategoriesUseCases from '@modules/categories/useCases/UpdateCategories/UpdateCategoriesUseCases';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: IFakeCategoriesRepository;
let updateCategoryService: UpdateCategoriesUseCases;

describe('UpdateCategoriesUseCases', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new IFakeCategoriesRepository();
    updateCategoryService = new UpdateCategoriesUseCases(
      fakeCategoriesRepository,
    );
  });

  it('must be able to list the categories', async () => {
    expect(
      updateCategoryService.execute({
        category_id: null,
        id: '',
        name: '',
        description: '',
        keywords: '',
        position: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
