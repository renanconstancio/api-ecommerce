import { v4 as uuidv4 } from 'uuid';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import { ICreateStore } from '@modules/stores/domain/dtos/ICreateStore';
import { IPaginateStore } from '@modules/stores/domain/dtos/IPaginateStore';
import { Stores } from '@prisma/client';

export default class FakeStoresRepository implements IStoresRepository {
  private stores: Stores[] = [];

  async create(data: ICreateStore): Promise<Stores> {
    const store = {} as Stores;

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

  async update(data: ICreateStore): Promise<Stores> {
    Object.assign(this.stores, data);

    return data as Stores;
  }

  async remove(id: string): Promise<void> {
    this.stores.find(stores => stores.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateStore> {
    return {} as IPaginateStore;
  }

  async findById(id: string): Promise<Stores | null> {
    const store = this.stores.find(stores => stores.id === id);

    return store as Stores;
  }

  async findByFantasyName(fantasy_name: string): Promise<Stores | null> {
    const store = this.stores.find(
      stores => stores.fantasy_name === fantasy_name,
    );

    return store as Stores;
  }
}
