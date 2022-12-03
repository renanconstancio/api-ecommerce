import { inject, injectable } from 'tsyringe';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';
import { IProductSkuRepository } from '@modules/productsSkus/infra/interfaces/IProductSkuRepository';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import { ProductSkuDTOs } from '@modules/productsSkus/dtos/productSkuDTOs';
import AppError from '@shared/errors/appError';

@injectable()
export default class PatchProductSkuUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('ProductSkuRepository')
    private productSkurepository: IProductSkuRepository,
  ) {}

  async execute({
    id,
    product_id,
    sku,
    codebar,
    price,
    cost_price,
    sale_price,
    quantity,
  }: ProductSkuDTOs): Promise<ProductDTOs | null | Error> {
    const isExistsId = await this.productRepository.findById(`${product_id}`);

    if (!isExistsId?.id) {
      throw new AppError(`product_id é obrigatório!`, 422);
    }

    const existsData = await this.productSkurepository.findBySku(sku);

    if ((existsData && !id) || (existsData && `${existsData.id}` !== `${id}`)) {
      throw new AppError(`${existsData?.sku} já está sendo usado`, 422);
    }

    await this.productSkurepository.save({
      id,
      product_id,
      sku,
      codebar,
      price,
      cost_price,
      sale_price,
      quantity,
    });

    return await this.productRepository.findById(`${product_id}`);
  }
}
