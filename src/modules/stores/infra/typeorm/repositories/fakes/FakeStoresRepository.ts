import { v4 as uuidv4 } from 'uuid';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import Store from '../../entities/Store';
import { ICreateStore } from '@modules/stores/domain/models/ICreateStore';
import { IStorePaginate } from '@modules/stores/domain/models/IStorePaginate';
import { IStore } from '@modules/stores/domain/models/IStore';

export default class FakeStoresRepository implements IStoresRepository {
  private stores: Store[] = [];

  async create({
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
  }: ICreateStore): Promise<Store> {
    const store = new Store();

    store.id = uuidv4();
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

    this.stores.push(store);

    return store;
  }

  async save(data: Store): Promise<Store> {
    Object.assign(this.stores, data);

    return data;
  }

  async remove(data: Store): Promise<void> {
    this.stores.find(stores => stores.id !== data.id);
    return;
  }

  async findAll(): Promise<IStorePaginate> {
    return {} as IStorePaginate;
  }

  async findById(id: string): Promise<Store | null> {
    const store = this.stores.find(stores => stores.id === id);

    return store as Store;
  }

  async findByFantasyName(fantasy_name: string): Promise<IStore | null> {
    const store = this.stores.find(
      stores => stores.fantasy_name === fantasy_name,
    );

    return store as Store;
  }
}
