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
    codebar,
    cost_price,
    price,
    quantity,
    sale_price,
    sku,
  }: ProductSkuDTOs): Promise<ProductDTOs> {
    const isExistsId = await this.repository.findById(`${id}`, `${product_id}`);

    if (!isExistsId && id) {
      throw new AppError(`Not found!`);
    }

    const existsData = await this.repository.findBy(name);

    if ((existsData && !id) || (existsData && `${existsData.id}` !== `${id}`)) {
      throw new AppError(
        `This is ${existsData?.name} record is already being used`,
        422,
      );
    }

    return await this.repository.save({
      id,
      name,
      description,
      keywords,
      visible,
      description_text,
    });
  }
}
