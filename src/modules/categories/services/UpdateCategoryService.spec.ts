import 'reflect-metadata';
import FakeCategoriesRepository from '../domain/repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryService from './UpdateCategoryService';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategoryService: UpdateCategoryService;

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
  });

  it('must be able to list the categories', async () => {
    expect(
      updateCategoryService.execute({
        category_id: null,
        id: '',
        name: '',
        description: '',
        keywords: '',
        position: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
