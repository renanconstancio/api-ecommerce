import 'reflect-metadata';
import FakeCategoriesRepository from '../domain/repositories/fakes/FakeCategoriesRepository';
import ListCategoryService from './ListCategoryService';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoriesService: ListCategoryService;
let createCategory: CreateCategoryService;

describe('ListCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoryService(fakeCategoriesRepository);
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('must be able to list the categories', async () => {
    await createCategory.execute({
      category_id: null,
      description: '',
      keywords: '',
      name: '',
      position: 0,
    });

    const customerList = await listCategoriesService.execute({
      page: 1,
      limit: 100,
      name: '',
    });

    expect(customerList).toEqual(expect.objectContaining({}));
  });
});
