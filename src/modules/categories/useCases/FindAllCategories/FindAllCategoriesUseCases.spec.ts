import 'reflect-metadata';
import IFakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesUseCases from '@modules/categories/useCases/CreateCategories/CreateCategoriesUseCases';
import FindAllCategoriesUseCases from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesUseCases';

let fakeCategoriesRepository: IFakeCategoriesRepository;
let listCategoriesService: FindAllCategoriesUseCases;
let createCategory: CreateCategoriesUseCases;

describe('FindAllCategoriesUseCases', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new IFakeCategoriesRepository();
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
