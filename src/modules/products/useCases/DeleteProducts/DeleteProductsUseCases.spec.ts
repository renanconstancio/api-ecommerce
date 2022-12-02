import 'reflect-metadata';
import AppError from '@shared/errors/appError';
import FakeProductsRepository from '@modules/products/infra/repositories/fakes/FakeProductsRepository';
import CreateProductsUseCases from '@modules/products/useCases/patchProduct/patchProductUseCase';
import DeleteProductsUseCases from '@modules/products/useCases/DeleteProducts/DeleteProductsUseCases';

let fakeProductsRepository: FakeProductsRepository;
let createDeleteProduct: CreateProductsUseCases;
let deleteProduct: DeleteProductsUseCases;

describe('DeleteProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createDeleteProduct = new CreateProductsUseCases(fakeProductsRepository);
    deleteProduct = new DeleteProductsUseCases(fakeProductsRepository);
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
