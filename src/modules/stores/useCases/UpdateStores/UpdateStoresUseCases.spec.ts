import 'reflect-metadata';
import FakeStoreRepository from '@modules/stores/repositories/fakes/FakeStoreRepository';
import UpdateStoresUseCases from '@modules/stores/useCases/UpdateStores/UpdateStoresUseCases';
import AppError from '@shared/errors/appError';

let fakeStoreRepository: FakeStoreRepository;
let updateStoreService: UpdateStoresUseCases;

describe('UpdateStoresUseCases', () => {
  beforeEach(() => {
    fakeStoreRepository = new FakeStoreRepository();
    updateStoreService = new UpdateStoresUseCases(fakeStoreRepository);
  });

  it('must be able to list the customers', async () => {
    expect(
      updateStoreService.execute({
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
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
