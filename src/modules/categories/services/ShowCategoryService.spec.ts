import 'reflect-metadata';
import FakeCategoriesRepository from '../domain/repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';
import ShowCategoryService from './ShowCategoryService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCategoriesRepository;
let showCategoryService: ShowCategoryService;
let createCategory: CreateCategoryService;

describe('ShowCategoryService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCategoriesRepository();
    showCategoryService = new ShowCategoryService(fakeCustomersRepository);
    createCategory = new CreateCategoryService(fakeCustomersRepository);
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
      showCategoryService.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
