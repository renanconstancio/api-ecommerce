import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListStoreService from '@modules/stores/services/ListStoreService';
import ShowStoreService from '@modules/stores/services/ShowStoreService';
import CreateStoreService from '@modules/stores/services/CreateStoreService';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';
import DeleteStoreService from '@modules/stores/services/DeleteStoreService';

export default class StoresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;

    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listStores = container.resolve(ListStoreService);

    const stores = await listStores.execute({ page, limit });

    return response.json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStore = container.resolve(ShowStoreService);

    const store = await showStore.execute({ id });

    return response.json(store);
  }

  public async create(request: Request, response: Response): Promise<Response> {
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

    const createStore = container.resolve(CreateStoreService);

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

  public async update(request: Request, response: Response): Promise<Response> {
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
    const { id } = request.params;

    const updateStore = container.resolve(UpdateStoreService);

    const store = await updateStore.execute({
      id,
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStore = container.resolve(DeleteStoreService);

    await deleteStore.execute({ id });

    return response.json([]);
  }
}
