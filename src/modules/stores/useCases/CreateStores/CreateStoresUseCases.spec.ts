import 'reflect-metadata';
import CreateStoresUseCases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import AppError from '@shared/errors/AppError';

let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoresUseCases;

describe('CreateStoresUseCases', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoresUseCases(fakeStoresRepository);
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
