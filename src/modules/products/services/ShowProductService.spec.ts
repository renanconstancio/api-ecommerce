import 'reflect-metadata';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';
import AppError from '@shared/errors/AppError';

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
