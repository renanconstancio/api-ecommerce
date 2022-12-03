import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/appError';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';

@injectable()
export default class PatchProductUseCase {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    keywords,
    visible,
    description_text,
  }: ProductDTOs): Promise<ProductDTOs> {
    const isExistsId = await this.repository.findById(`${id}`);

    if (!isExistsId && id) {
      throw new AppError(`nada encontrado!`);
    }

    const existsData = await this.repository.findByName(name);

    if ((existsData && !id) || (existsData && `${existsData.id}` !== `${id}`)) {
      throw new AppError(`${existsData?.name} já está sendo usado`, 422);
    }

    return await this.repository.save({
      id,
      name,
      description,
      keywords,
      visible,
      description_text,
    });
  }
}
