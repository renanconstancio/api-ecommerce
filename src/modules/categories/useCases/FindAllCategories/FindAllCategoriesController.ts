import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllCategoriesUseCases from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesUseCases';

export default class FindAllCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const { name } = (
      request.query.categories ? request.query.categories : ''
    ) as {
      [key: string]: '';
    };

    const useCase = container.resolve(FindAllCategoriesUseCases);
    const categories = await useCase.execute({
      page,
      limit,
      name,
    });

    return response.json(categories);
  }
}
