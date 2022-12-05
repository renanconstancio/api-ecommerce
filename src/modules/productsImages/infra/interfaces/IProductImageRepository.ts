import { ProductImageDTOs } from '@modules/productsImages/dtos/productImageDTOs';

export interface IProductImageRepository {
  findById(id: string): Promise<{ id: string } | null>;
  delete(id: string): Promise<void>;
  save(data: ProductImageDTOs): Promise<ProductImageDTOs>;
}
