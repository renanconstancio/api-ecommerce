import { inject, injectable } from 'tsyringe';
import { IProductImageRepository } from '@modules/productsImages/infra/interfaces/IProductImageRepository';

@injectable()
export default class PatchProductImageUseCase {
  constructor(
    @inject('ProductImageRepository')
    private productImageRepository: IProductImageRepository,
  ) {}

  async execute({
    product_sku_id,
    photos,
  }: {
    product_sku_id: string;
    photos: string[];
  }): Promise<void> {
    await Promise.all(
      photos.map(async (name: string, x) => {
        await this.productImageRepository.save({
          position: x + 1,
          product_sku_id: product_sku_id,
          image: name,
        });
      }),
    );

    return;
  }
}
