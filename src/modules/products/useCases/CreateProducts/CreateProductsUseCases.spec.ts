import 'reflect-metadata';
import CreateProductsUseCases from '@modules/products/useCases/CreateProducts/CreateProductsUseCases';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductsUseCases;

describe('CreateProductsUseCases', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductsUseCases(fakeProductsRepository);
  });

  it('should be able to create a new Product', async () => {
    const Product = await createProduct.execute({
      description: 'description',
      description_text: 'description_text',
      keywords: 'keywords',
      name: 'name',
      visible: 'visible',
    });

    expect(Product).toHaveProperty('id');
  });

  it('should not be able to create two poroduts with the same name', async () => {
    await createProduct.execute({
      description: 'description',
      description_text: 'description_text',
      keywords: 'keywords',
      name: 'name',
      visible: 'visible',
    });

    expect(
      createProduct.execute({
        description: 'description',
        description_text: 'description_text',
        keywords: 'keywords',
        name: 'name',
        visible: 'visible',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
