import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductSkusUseCases from '@modules/products/useCases/CreateProductsSkus/CreateProductSkusUseCases';

export default class CreateProductsSkusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sku, cost_price, sale_price, price, quantity } = request.body;
    const { product_id } = request.params;

    const useCases = container.resolve(CreateProductSkusUseCases);
    const product = await useCases.execute({
      sku,
      product_id,
      cost_price,
      sale_price,
      price,
      quantity,
    });

    return response.json(product);
  }
}
