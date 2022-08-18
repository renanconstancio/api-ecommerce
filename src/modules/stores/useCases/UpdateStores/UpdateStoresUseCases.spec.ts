import 'reflect-metadata';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import UpdateStoresUseCases from '@modules/stores/useCases/UpdateStores/UpdateStoresUseCases';
import AppError from '@shared/errors/AppError';

let fakeStoresRepository: FakeStoresRepository;
let updateStoreService: UpdateStoresUseCases;

describe('UpdateStoresUseCases', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    updateStoreService = new UpdateStoresUseCases(fakeStoresRepository);
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
