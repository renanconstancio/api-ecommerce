import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import ShowCategoryService from '@modules/categories/services/ShowCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export class CategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, keywords, position, category_id } = request.body;

    const createCategory = container.resolve(CreateCustomerService);

    const customer = await createCategory.execute({
      name,
      description,
      keywords,
      position,
      category_id,
    });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, description, keywords, position } = request.body;
    const { id } = request.params;

    const createCategory = container.resolve(UpdateCategoryService);

    const customer = await createCategory.execute({
      name,
      description,
      keywords,
      position,
      id,
    });

    return response.json(customer);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const { name } = (
      request.query.categories ? request.query.categories : ''
    ) as {
      [key: string]: '';
    };

    const listCategories = container.resolve(ListCategoryService);
    const categories = await listCategories.execute({
      page,
      limit,
      name,
    });

    return response.json(categories);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCategory = container.resolve(ShowCategoryService);

    const category = await showCategory.execute({ id });

    return response.json(category);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({ id });

    return response.json([]);
  }
}
