import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';

let fakeCustomersRepository: FakeProductsRepository;
let showProductService: ShowProductService;
let createProduct: CreateProductService;

describe('ShowProductService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeProductsRepository();
    showProductService = new ShowProductService(fakeCustomersRepository);
    createProduct = new CreateProductService(fakeCustomersRepository);
  });

  it('must be able to list the products', async () => {
    const category = await createProduct.execute({
      name: 'Product A',
      description: '',
      price: 0,
      quantity: 0,
      sku: '',
    });
    expect(category).toHaveProperty('id');
  });

  it("shouldn't be able to list products if it doesn't exist", async () => {
    expect(
      showProductService.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
