import 'reflect-metadata';

import CreateStoresUseCases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';
import FindAllStoresUseCases from '@modules/stores/useCases/FindAllStores/FindAllStoresUseCases';
import FakeStoreRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';

let fakeStoreRepository: FakeStoreRepository;
let listStoresService: FindAllStoresUseCases;
let createStore: CreateStoresUseCases;

describe('FindAllStoresUseCases', () => {
  beforeEach(() => {
    fakeStoreRepository = new FakeStoreRepository();
    listStoresService = new FindAllStoresUseCases(fakeStoreRepository);
    createStore = new CreateStoresUseCases(fakeStoreRepository);
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
