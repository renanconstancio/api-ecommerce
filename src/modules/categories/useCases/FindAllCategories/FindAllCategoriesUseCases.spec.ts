import 'reflect-metadata';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesUseCases from '@modules/categories/useCases/CreateCategories/CreateCategoriesUseCases';
import FindAllCategoriesUseCases from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesUseCases';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoriesService: FindAllCategoriesUseCases;
let createCategory: CreateCategoriesUseCases;

describe('FindAllCategoriesUseCases', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new FindAllCategoriesUseCases(
      fakeCategoriesRepository,
    );
    createCategory = new CreateCategoriesUseCases(fakeCategoriesRepository);
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
