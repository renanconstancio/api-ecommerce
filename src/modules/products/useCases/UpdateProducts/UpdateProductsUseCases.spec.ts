import 'reflect-metadata';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import UpdateProductsUseCases from '@modules/products/useCases/UpdateProducts/UpdateProductsUseCases';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductsUseCases;

describe('UpdateProductsUseCases', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProductService = new UpdateProductsUseCases(fakeProductsRepository);
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
