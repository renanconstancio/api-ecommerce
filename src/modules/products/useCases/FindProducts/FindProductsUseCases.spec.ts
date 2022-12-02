import 'reflect-metadata';

import FindProductsUseCases from '@modules/products/useCases/FindProducts/FindProductsUseCases';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import CreateProductsUseCases from '@modules/products/useCases/patchProduct/patchProductUseCase';
import AppError from '@shared/errors/appError';

let fakeCustomersRepository: FakeProductsRepository;
let showProductService: FindProductsUseCases;
let createProduct: CreateProductsUseCases;

describe('FindProductsUseCases', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeProductsRepository();
    showProductService = new FindProductsUseCases(fakeCustomersRepository);
    createProduct = new CreateProductsUseCases(fakeCustomersRepository);
  });

  it('must be able to list the products', async () => {
    const category = await createProduct.execute({
      description: 'description',
      description_text: 'description_text',
      keywords: 'keywords',
      name: 'name',
      visible: 'visible',
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
