import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductsUseCases from '@modules/products/useCases/CreateProducts/CreateProductsUseCases';

export default class CreateProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, keywords, description, description_text, visible } =
      request.body;

    const useCases = container.resolve(CreateProductsUseCases);
    const product = await useCases.execute({
      name,
      keywords,
      description,
      description_text,
      visible,
    });

    return response.json(product);
  }
}
