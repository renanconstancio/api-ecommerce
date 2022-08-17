import 'reflect-metadata';
import FakeStoresRepository from '@modules/stores/domain/repositories/fakes/FakeStoresRepository';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';
import AppError from '@shared/errors/AppError';

let fakeStoresRepository: FakeStoresRepository;
let updateStoreService: UpdateStoreService;

describe('UpdateStoreService', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    updateStoreService = new UpdateStoreService(fakeStoresRepository);
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
