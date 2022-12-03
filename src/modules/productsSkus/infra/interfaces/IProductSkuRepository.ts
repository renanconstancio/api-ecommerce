import { ProductSkuDTOs } from '../../dtos/productSkuDTOs';
import { ProductSkuStockDTOs } from '../../../products/dtos/productSkuStockDTOs';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';

export interface IProductSkuRepository {
  findBySku(sku: string): Promise<ProductSkuDTOs | null>;
  findById(id: string): Promise<ProductSkuDTOs | null>;
  findByIdSku(product_id: string, id: string): Promise<ProductDTOs | null>;
  updateStock(data: ProductSkuStockDTOs[]): Promise<void>;
  save(sku: ProductSkuDTOs): Promise<ProductSkuDTOs>;
  remove(id: string): Promise<void>;
}
