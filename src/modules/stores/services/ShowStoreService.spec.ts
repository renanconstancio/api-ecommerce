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

  it('must be able to list the categories', async () => {
    const category = await createStore.execute({
      name: 'Store A',
      description: '',
      keywords: '',
      position: 1,
      category_id: '',
    });
    expect(category).toHaveProperty('id');
  });

  it("shouldn't be able to list categories if it doesn't exist", async () => {
    expect(
      showStoreService.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
