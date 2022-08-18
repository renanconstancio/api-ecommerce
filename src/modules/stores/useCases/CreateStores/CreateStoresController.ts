import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateStoresUseCases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';

export default class CreateStoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      fantasy_name,
      email,
      phone,
      opening_hours,
      address,
      number,
      district,
      complement,
      city,
      state,
      zip_code,
      visible,
    } = request.body;

    const createStore = container.resolve(CreateStoresUseCases);

    const store = await createStore.execute({
      title,
      fantasy_name,
      email,
      phone,
      opening_hours,
      address,
      number,
      district,
      complement,
      city,
      state,
      zip_code,
      visible,
    });

    return response.json(store);
  }
}
