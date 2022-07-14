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
        description: 'description',
        description_text: 'description_text',
        keywords: 'keywords',
        visible: 'visible',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
