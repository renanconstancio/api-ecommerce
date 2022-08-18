import 'reflect-metadata';

import CreateStoresUseCases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';
import FindAllStoresUseCases from '@modules/stores/useCases/FindAllStores/FindAllStoresUseCases';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';

let fakeStoresRepository: FakeStoresRepository;
let listStoresService: FindAllStoresUseCases;
let createStore: CreateStoresUseCases;

describe('FindAllStoresUseCases', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    listStoresService = new FindAllStoresUseCases(fakeStoresRepository);
    createStore = new CreateStoresUseCases(fakeStoresRepository);
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
