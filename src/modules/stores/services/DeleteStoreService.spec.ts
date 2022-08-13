import 'reflect-metadata';
import FakeStoresRepository from '../domain/repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';
import DeleteStoreService from './DeleteStoreService';
import AppError from '@shared/errors/AppError';

let fakeStoriesRepository: FakeStoresRepository;
let createDeleteStore: CreateStoreService;
let deleteStore: DeleteStoreService;

describe('DeleteStoreService', () => {
  beforeEach(() => {
    fakeStoriesRepository = new FakeStoresRepository();
    createDeleteStore = new CreateStoreService(fakeStoriesRepository);
    deleteStore = new DeleteStoreService(fakeStoriesRepository);
  });

  it('should be able to delete a store', async () => {
    const store = await createDeleteStore.execute({
      title: 'Title Store',
      fantasy_name: 'Fantasy Name Store',
      email: 'email@store.com',
      phone: '990000111',
      opening_hours: 'store 07:00 as 17:00',
      address: 'Teste',
      number: '1244',
      district: '',
      complement: '',
      city: '',
      state: '',
      zip_code: '',
      visible: 1,
    });

    const storeDelete = await deleteStore.execute({
      id: store.id,
    });

    expect(storeDelete).toBeUndefined();
  });

  it('should not be able to delete a store', async () => {
    expect(
      deleteStore.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
