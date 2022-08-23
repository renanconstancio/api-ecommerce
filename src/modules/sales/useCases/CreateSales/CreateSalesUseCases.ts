import { inject, injectable } from 'tsyringe';
import { Sales } from '@modules/sales/infra/prisma/entities/Sales';
import { IEnumSalesStatus } from '@modules/sales/dtos/IEnumSalesStatus';

import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { ISalesStatusRepository } from '@modules/sales/repositories/ISalesStatusRepository';
import { ISalesProductsRepository } from '@modules/sales/repositories/ISalesProductsRepository';

import { ISalesAddressesRepository } from '@modules/sales/repositories/ISalesAddressesRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';

import { IRequestCreateSales } from '@modules/sales/dtos/IRequestCreateSales';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateSalesUseCases {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('SalesProductsRepository')
    private salesProductsRepository: ISalesProductsRepository,

    @inject('SalesStatusRepository')
    private salesStatusRepository: ISalesStatusRepository,

    @inject('SalesAddressesRepository')
    private salesAddressesRepository: ISalesAddressesRepository,
  ) {}

  async execute(data: IRequestCreateSales): Promise<Sales> {
    const customerExists = await this.customersRepository.findById(
      data.customers_id,
    );

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // const addressExists = await this.customersRepository.findById(
    //   data.customers_id,
    // );

    // if (!addressExists) {
    //   throw new AppError('Could not find any customer with the given id.');
    // }

    const existsProducts = await this.salesProductsRepository.findAllByIds(
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
    const sale = await this.salesRepository.create({
      customers_id: customerExists.id,
    });

    const serializedProducts = data.products.map(sku => ({
      sales_id: sale.id,
      products_skus_id: sku.id,
      quantity: sku.quantity,
      price_paid: sku.price_paid,
    }));

    await this.salesProductsRepository.create(serializedProducts);

    const updatedProductsQuantity = serializedProducts.map(sku => ({
      id: sku.products_skus_id,
      quantity:
        existsProducts.filter(p => p.id === sku.products_skus_id)[0].quantity -
        sku.quantity,
    }));

    await this.salesProductsRepository.updateStock(updatedProductsQuantity);

    await this.salesStatusRepository.create({
      sales_id: sale.id,
      status: IEnumSalesStatus.ORDER_MADE,
    });

    return sale as any;
  }
}
