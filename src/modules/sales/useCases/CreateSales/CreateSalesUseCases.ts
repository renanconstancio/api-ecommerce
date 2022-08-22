import { inject, injectable } from 'tsyringe';
import { Sales } from '@modules/sales/infra/prisma/entities/Sales';

import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { ICreateSales } from '@modules/sales/dtos/ICreateSales';
import { ISalesProductsRepository } from '@modules/sales/repositories/ISalesProductsRepository';
import { ISalesCustomersRepository } from '@modules/sales/repositories/ISalesCustomersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateSalesUseCases {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('SalesCustomersRepository')
    private salesCustomersRepository: ISalesCustomersRepository,

    @inject('SalesProductsRepository')
    private salesPproductsRepository: ISalesProductsRepository,
  ) {}

  async execute(data: ICreateSales): Promise<Sales> {
    const customerExists = await this.salesCustomersRepository.findById(
      data.customers_id,
    );

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // const addressExists = await this.salesCustomersRepository.findById(
    //   data.customers_id,
    // );

    // if (!addressExists) {
    //   throw new AppError('Could not find any customer with the given id.');
    // }

    const existsProducts = await this.salesPproductsRepository.findAllByIds(
      data.products,
    );

    if (!existsProducts.length) {
      throw new AppError(
        'Could not find any products skus with the given ids.',
      );
    }

    const existsProductsIds = existsProducts.map(sku => sku.id);

    const checkInexistentProducts = data.products.filter(
      sku => !existsProductsIds.includes(sku.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find skus ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = data.products.filter(
      sku =>
        existsProducts.filter(p => p.id === sku.id)[0].quantity < sku.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = data.products.map(sku => ({
      produtcts_skus_id: sku.id,
      quantity: sku.quantity,
      price_paid: existsProducts.filter(p => p.id === sku.id)[0].sale_price,
    }));

    const codeSale = await this.salesRepository.nextCode();

    // const order = await this.salesRepository.create({
    //   customers_id: customerExists,
    //   products: serializedProducts,
    // });

    // const { products } = order;

    // const updatedProductsQuantity = products.map(sku => ({
    //   id: sku.produtcts_skus_id,
    //   quantity:
    //     existsProducts.filter(p => p.id === sku.produtcts_skus_id)[0].quantity -
    //     sku.quantity,
    // }));

    // await this.salesPproductsRepository.updateStock(updatedProductsQuantity);

    return { code: `B ${codeSale}` } as Sales;
  }
}
