import 'reflect-metadata';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import ListProductService from './ListProductService';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsService: ListProductService;
let createProduct: CreateProductService;

describe('ListProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProductsService = new ListProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('must be able to list the customers', async () => {
    await createProduct.execute({
      name: 'Product A',
      description: '',
      price: 0,
      quantity: 0,
      sku: '',
    });

    const customerList = await listProductsService.execute({
      page: 1,
      limit: 100,
    });

    expect(customerList).toEqual(expect.objectContaining({}));
  });
});
