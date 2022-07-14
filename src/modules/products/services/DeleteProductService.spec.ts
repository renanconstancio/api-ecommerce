import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let createDeleteProduct: CreateProductService;
let deleteProduct: DeleteProductService;

describe('DeleteProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createDeleteProduct = new CreateProductService(fakeProductsRepository);
    deleteProduct = new DeleteProductService(fakeProductsRepository);
  });

  it('should be able to delete a product', async () => {
    const product = await createDeleteProduct.execute({
      description: 'description',
      description_text: 'description_text',
      keywords: 'keywords',
      name: 'name',
      visible: 'visible',
    });

    const productDelete = await deleteProduct.execute({
      id: product.id,
    });

    expect(productDelete).toBeUndefined();
  });

  it('should not be able to delete a product', async () => {
    expect(
      deleteProduct.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
