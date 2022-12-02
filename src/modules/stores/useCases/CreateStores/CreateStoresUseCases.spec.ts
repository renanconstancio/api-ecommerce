import 'reflect-metadata';
import CreateStoresUseCases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';
import FakeStoreRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';
import AppError from '@shared/errors/appError';

let fakeStoreRepository: FakeStoreRepository;
let createStore: CreateStoresUseCases;

describe('CreateStoresUseCases', () => {
  beforeEach(() => {
    fakeStoreRepository = new FakeStoreRepository();
    createStore = new CreateStoresUseCases(fakeStoreRepository);
  });

  it('should be able to create a new store', async () => {
    const store = await createStore.execute({
      title: 'title',
      fantasy_name: 'fantasy_name',
      email: 'email',
      phone: 'phone',
      opening_hours: 'opening_hours',
      address: 'address',
      number: 'number',
      district: 'district',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zip_code: 'zip_code',
      visible: 1,
    });

    expect(store).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same fantasy_name', async () => {
    const equalData = {
      title: 'title',
      fantasy_name: 'fantasy_name',
      email: 'email',
      phone: 'phone',
      opening_hours: 'opening_hours',
      address: 'address',
      number: 'number',
      district: 'district',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zip_code: 'zip_code',
      visible: 1,
    };

    await createStore.execute(equalData);

    expect(createStore.execute(equalData)).rejects.toBeInstanceOf(AppError);
  });
});
