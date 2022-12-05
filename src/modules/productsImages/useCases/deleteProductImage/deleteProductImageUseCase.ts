import { inject, injectable } from 'tsyringe';
import { IProductImageRepository } from '@modules/productsImages/infra/interfaces/IProductImageRepository';
import AppError from '@shared/errors/appError';

@injectable()
export default class DeleteProductImageUseCase {
  constructor(
    @inject('ProductImageRepository')
    private productImageRepository: IProductImageRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const isExists = await this.productImageRepository.findById(id);

    if (!isExists) {
      throw new AppError('Imagem não encontrada!');
    }

    return await this.productImageRepository.delete(id);
  }
}
