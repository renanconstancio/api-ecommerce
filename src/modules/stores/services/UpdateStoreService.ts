import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IStoresRepository } from '../domain/repositories/IStoresRepository';
import { IUpdateStore } from '../domain/models/IUpdateStore';
import { IStore } from '../domain/models/IStore';

@injectable()
export default class UpdateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
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
  }: IUpdateStore): Promise<IStore> {
    const store = await this.storesRepository.findById(id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    const productExists = await this.storesRepository.findByFantasyName(
      fantasy_name,
    );

    if (productExists) {
      throw new AppError('There is already one store with this fantasy name');
    }

    store.title = title;
    store.fantasy_name = fantasy_name;
    store.email = email;
    store.phone = phone;
    store.opening_hours = opening_hours;
    store.address = address;
    store.number = number;
    store.district = district;
    store.complement = complement;
    store.city = city;
    store.state = state;
    store.zip_code = zip_code;
    store.visible = visible;

    await this.storesRepository.save(store);

    return store;
  }
}
