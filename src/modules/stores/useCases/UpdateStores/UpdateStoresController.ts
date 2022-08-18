import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateStoresUseCases from '@modules/stores/useCases/UpdateStores/UpdateStoresUseCases';

export default class UpdateStoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStore = container.resolve(UpdateStoresUseCases);

    await deleteStore.execute({ id });

    return response.json([]);
  }
}
