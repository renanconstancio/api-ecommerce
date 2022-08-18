import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteStoreService from '@modules/stores/useCases/DeleteStores/DeleteStoresUseCases';

export default class DeleteStoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStore = container.resolve(DeleteStoreService);

    await deleteStore.execute({ id });

    return response.json([]);
  }
}
