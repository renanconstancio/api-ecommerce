import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FindAllProductsUseCases from '@modules/products/useCases/FindAllProducts/FindAllProductsUseCases';
import CreateProductsUseCases from '@modules/products/useCases/patchProduct/patchProductUseCase';

let fakeProductsRepository: FakeProductsRepository;
let listProductsService: FindAllProductsUseCases;
let createProduct: CreateProductsUseCases;

describe('FindAllProductsUseCases', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProductsService = new FindAllProductsUseCases(fakeProductsRepository);
    createProduct = new CreateProductsUseCases(fakeProductsRepository);
  });

  it('must be able to list the customers', async () => {
    await createProduct.execute({
      description: 'description',
      description_text: 'description_text',
      keywords: 'keywords',
      name: 'name',
      visible: 'visible',
    });

    const customerList = await listProductsService.execute({
      page: 1,
      limit: 100,
      name: '',
    });

    expect(customerList).toEqual(expect.objectContaining({}));
  });
});
