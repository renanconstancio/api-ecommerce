import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateCategoriesUseCases from '@modules/categories/useCases/UpdateCategories/UpdateCategoriesUseCases';

export default class UpdateCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, keywords, position, category_id } = request.body;
    const { id } = request.params;

    const useCases = container.resolve(UpdateCategoriesUseCases);

    const customer = await useCases.execute({
      category_id,
      name,
      description,
      keywords,
      position,
      id,
    });

    return response.json(customer);
  }
}
