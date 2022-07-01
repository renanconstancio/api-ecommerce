import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateStoreService from './CreateStoreService';
import FakeStoresRepository from '../infra/typeorm/repositories/fakes/FakeStoresRepository';

let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;

describe('CreateStoreService', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('should be able to create a new category', async () => {
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
      visible: false,
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createStore.execute({
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
      visible: false,
    });

    expect(
      createStore.execute({
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
        visible: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
