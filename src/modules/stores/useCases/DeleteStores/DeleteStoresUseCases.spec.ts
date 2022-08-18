import 'reflect-metadata';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import CreateStoresUsecases from '@modules/stores/useCases/CreateStores/CreateStoresUseCases';
import DeleteStoresUseCases from '@modules/stores/useCases/DeleteStores/DeleteStoresUseCases';
import AppError from '@shared/errors/AppError';

let fakeStoriesRepository: FakeStoresRepository;
let createDeleteStore: CreateStoresUsecases;
let deleteStore: DeleteStoresUseCases;

describe('DeleteStoresUseCases', () => {
  beforeEach(() => {
    fakeStoriesRepository = new FakeStoresRepository();
    createDeleteStore = new CreateStoresUsecases(fakeStoriesRepository);
    deleteStore = new DeleteStoresUseCases(fakeStoriesRepository);
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
