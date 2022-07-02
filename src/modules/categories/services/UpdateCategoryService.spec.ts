import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCategoriesRepository from '../domain/repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategoryService: UpdateCategoryService;

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
  });

  it('must be able to list the customers', async () => {
    expect(
      updateCategoryService.execute({
        id: '',
        name: '',
        description: '',
        keywords: '',
        position: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
