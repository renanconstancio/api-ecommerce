import { v4 as uuidv4 } from 'uuid';
import { IStoresRepository } from '@modules/stores/repositories/IStoresRepository';
import { ICreateStore } from '@modules/stores/dtos/ICreateStore';
import { IPaginateStore } from '@modules/stores/dtos/IPaginateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';

export default class FakeStoresRepository implements IStoresRepository {
  private stores: StoresEntity[] = [];

  async create(data: ICreateStore): Promise<StoresEntity> {
    const store = {} as StoresEntity;

    store.id = uuidv4();
    store.title = data.title;
    store.fantasy_name = data.fantasy_name;
    store.email = data.email;
    store.phone = data.phone;
    store.opening_hours = data.opening_hours;
    store.address = data.address;
    store.number = data.number;
    store.district = data.district;
    store.complement = data.complement;
    store.city = data.city;
    store.state = data.state;
    store.zip_code = data.zip_code;
    store.visible = data.visible ? 1 : 0;

    this.stores.push(store);

    return store;
  }

  async update(data: ICreateStore): Promise<StoresEntity> {
    Object.assign(this.stores, data);

    return data as StoresEntity;
  }

  async remove(id: string): Promise<void> {
    this.stores.find(stores => stores.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateStore> {
    return {} as IPaginateStore;
  }

  async findById(id: string): Promise<StoresEntity | null> {
    const store = this.stores.find(stores => stores.id === id);

    return store as StoresEntity;
  }

  async findByFantasyName(fantasy_name: string): Promise<StoresEntity | null> {
    const store = this.stores.find(
      stores => stores.fantasy_name === fantasy_name,
    );

    return store as StoresEntity;
  }
}
