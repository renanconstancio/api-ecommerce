import { ProductSkuDTOs } from '../prisma/dtos/productSkuDTOs';

export interface IProductImageRepository {
  // findBySkuIdCount(id: string): Promise<number>;
  // findById(id: string): Promise<ProductsImagesEntity | null>;
  save(sku: ProductSkuDTOs): Promise<ProductSkuDTOs>;
  remove(id: string): Promise<void>;
}
