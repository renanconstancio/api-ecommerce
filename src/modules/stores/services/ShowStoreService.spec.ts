import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeStoresRepository from '../domain/repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';
import ShowStoreService from './ShowStoreService';

let fakeCustomersRepository: FakeStoresRepository;
let showStoreService: ShowStoreService;
let createStore: CreateStoreService;

describe('ShowStoreService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeStoresRepository();
    showStoreService = new ShowStoreService(fakeCustomersRepository);
    createStore = new CreateStoreService(fakeCustomersRepository);
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
