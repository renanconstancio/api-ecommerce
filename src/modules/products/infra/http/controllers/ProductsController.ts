import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { classToClass } from 'class-transformer';

export default class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const { name } = (request.query.products ? request.query.products : '') as {
      [key: string]: '';
    };

    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute({ page, limit, name });

    return response.json(classToClass(products));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, keywords, description, description_text, visible } =
      request.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      keywords,
      description,
      description_text,
      visible,
    });

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, keywords, description, description_text, visible } =
      request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);

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

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
