import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/appError';
import { ProductDTOs } from '@modules/products/infra/prisma/dtos/productDTOs';
import { IProductSkuRepository } from '@modules/products/infra/repositories/IProductSkuRepository';
import { ProductSkuDTOs } from '@modules/products/infra/prisma/dtos/productSkuDTOs';

@injectable()
export default class PatchProductUseCase {
  constructor(
    @inject('ProductSkuRepository')
    private repository: IProductSkuRepository,
  ) {}

  async execute({
    id,
    product_id,
    sku,
    codebar,
    cost_price,
    price,
    quantity,
    sale_price,
  }: ProductSkuDTOs): Promise<ProductDTOs> {
    const isExistsId = await this.repository.findById(`${id}`, `${product_id}`);

    if (!isExistsId && id) {
      throw new AppError(`Not found!`);
    }

    const existsData = await this.repository.findBySku(sku);

    if ((existsData && !id) || (existsData && `${existsData.id}` !== `${id}`)) {
      throw new AppError(
        `This is ${existsData?.sku} record is already being used`,
        422,
      );
    }

    return await this.repository.save({
      id,
      product_id,
      sku,
      codebar,
      cost_price,
      price,
      quantity,
      sale_price,
    });
  }
}
