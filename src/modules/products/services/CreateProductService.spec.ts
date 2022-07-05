import 'reflect-metadata';
import CreateProductService from './CreateProductService';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a new Product', async () => {
    const Product = await createProduct.execute({
      price: 0,
      quantity: 0,
      name: 'Product A',
      description: '',
      sku: '',
    });

    expect(Product).toHaveProperty('id');
  });

  it('should not be able to create two poroduts with the same name', async () => {
    await createProduct.execute({
      price: 0,
      quantity: 0,
      name: 'Product A',
      description: '',
      sku: '',
    });

    expect(
      createProduct.execute({
        price: 0,
        quantity: 0,
        name: 'Product A',
        description: '',
        sku: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
