import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateProductsSkusUseCases from '@modules/products/useCases/UpdateProductsSkus/UpdateProductsSkusUseCases';

export default class UpdateProductsSkusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sku, cost_price, sale_price, price, quantity } = request.body;
    const { product_id, id } = request.params;

    const updateProductSku = container.resolve(UpdateProductsSkusUseCases);

    const product = await updateProductSku.execute({
      id,
      product_id,
      sku,
      cost_price,
      sale_price,
      price,
      quantity,
    });

    return response.json(product);
  }
}
