import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateProductsUseCases from '@modules/products/useCases/UpdateProducts/UpdateProductsUseCases';

export default class UpdateProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, keywords, description, description_text, visible } =
      request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductsUseCases);

    const product = await updateProduct.execute({
      id,
      name,
      keywords,
      description,
      description_text,
      visible,
    });

    return response.json(product);
  }
}
