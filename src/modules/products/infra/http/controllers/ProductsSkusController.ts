import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductSkuService from '@modules/products/services/CreateProductSkuService';
import DeleteProductSkuService from '@modules/products/services/DeleteProductSkuService';
import ListProductSkuService from '@modules/products/services/ListProductSkuService';
import ShowProductSkuService from '@modules/products/services/ShowProductSkuService';
import UpdateProductSkuService from '@modules/products/services/UpdateProductSkuService';

export default class ProductsSkusController {
  async index(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const listProductsSkus = container.resolve(ListProductSkuService);

    const productsSkus = await listProductsSkus.execute(product_id);

    return response.json(productsSkus);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const showProduct = container.resolve(ShowProductSkuService);

    const product = await showProduct.execute({ id, product_id });

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { sku, cost_price, sale_price, price, quantity } = request.body;
    const { product_id } = request.params;

    const createProductSku = container.resolve(CreateProductSkuService);
    const product = await createProductSku.execute({
      sku,
      product_id,
      cost_price,
      sale_price,
      price,
      quantity,
    });

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { sku, cost_price, sale_price, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductSku = container.resolve(UpdateProductSkuService);

    const product = await updateProductSku.execute({
      id,
      sku,
      cost_price,
      sale_price,
      price,
      quantity,
    });

    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductSku = container.resolve(DeleteProductSkuService);

    await deleteProductSku.execute({ id });

    return response.json([]);
  }
}
