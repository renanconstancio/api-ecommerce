import { inject, injectable } from 'tsyringe';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import { IUpdateStore } from '@modules/stores/domain/dtos/IUpdateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute({
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
  }: IUpdateStore): Promise<StoresEntity> {
    const store = await this.storesRepository.findById(id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    const storeExists = await this.storesRepository.findByFantasyName(
      fantasy_name,
    );

    if (storeExists && fantasy_name !== store.fantasy_name) {
      throw new AppError(
        'There is already one store with this fantasy fantasy_name',
      );
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
    store.visible = visible ? 1 : 0;

    await this.storesRepository.update(store);

    return store;
  }
}
