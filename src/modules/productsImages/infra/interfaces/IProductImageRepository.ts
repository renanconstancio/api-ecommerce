import { ProductImageDTOs } from '@modules/productsImages/dtos/productImageDTOs';

export interface IProductImageRepository {
  save(data: ProductImageDTOs): Promise<ProductImageDTOs>;
  delete(id: string): Promise<void>;
}
