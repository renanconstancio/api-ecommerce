import 'reflect-metadata';
import FakeStoreRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';
import CreateStoresUseCases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';
import FindStoresUseCases from '@modules/stores/useCases/FindStores/FindStoresUseCases';
import AppError from '@shared/errors/appError';

let fakeCustomersRepository: FakeStoreRepository;
let showStoreService: FindStoresUseCases;
let createStore: CreateStoresUseCases;

describe('FindStoresUseCases', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeStoreRepository();
    showStoreService = new FindStoresUseCases(fakeCustomersRepository);
    createStore = new CreateStoresUseCases(fakeCustomersRepository);
  });

  it('must be able to list the stores', async () => {
    const category = await createStore.execute({
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
      visible: 0,
    });
    expect(category).toHaveProperty('id');
  });

  it("shouldn't be able to list stores if it doesn't exist", async () => {
    expect(
      showStoreService.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
