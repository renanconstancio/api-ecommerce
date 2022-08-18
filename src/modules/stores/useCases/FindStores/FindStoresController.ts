import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindStoresUseCases from '@modules/stores/useCases/FindStores/FindStoresUseCases';

export default class FindStoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStore = container.resolve(FindStoresUseCases);

    const store = await showStore.execute({ id });

    return response.json(store);
  }
}
