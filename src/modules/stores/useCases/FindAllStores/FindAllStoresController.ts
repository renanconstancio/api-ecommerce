import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllStoresUseCases from '@modules/stores/useCases/FindAllStores/FindAllStoresUseCases';

export default class FindAllStoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;

    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listStores = container.resolve(FindAllStoresUseCases);

    const stores = await listStores.execute({ page, limit });

    return response.json(stores);
  }
}
