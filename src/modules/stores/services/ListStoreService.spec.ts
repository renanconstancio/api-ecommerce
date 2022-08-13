import 'reflect-metadata';

import ListStoreService from './ListStoreService';
import CreateStoreService from './CreateStoreService';
import FakeStoresRepository from '../domain/repositories/fakes/FakeStoresRepository';

let fakeStoresRepository: FakeStoresRepository;
let listStoresService: ListStoreService;
let createStore: CreateStoreService;

describe('ListStoreService', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    listStoresService = new ListStoreService(fakeStoresRepository);
    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('must be able to list the store', async () => {
    await createStore.execute({
      address: '',
      city: '',
      complement: '',
      district: '',
      email: '',
      fantasy_name: '',
      number: '',
      opening_hours: '',
      phone: '',
      state: '',
      title: '',
      visible: 1,
      zip_code: '',
    });

    const customerList = await listStoresService.execute({
      page: 1,
      limit: 100,
    });

    expect(customerList).toEqual(expect.objectContaining({}));
  });
});
