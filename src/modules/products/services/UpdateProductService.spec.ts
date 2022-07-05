import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductService;

describe('UpdateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProductService = new UpdateProductService(fakeProductsRepository);
  });

  it('must be able to list the customers', async () => {
    expect(
      updateProductService.execute({
        id: '',
        name: 'Product A',
        description: '',
        price: 0,
        quantity: 0,
        sku: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
