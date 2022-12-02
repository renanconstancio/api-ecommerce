import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/appError';
import ProductRepository from '@modules/products/infra/prisma/repositories/productRepository';
import { ProductDTOs } from '@modules/products/infra/prisma/dtos/productDTOs';

@injectable()
export default class PatchProductUseCase {
  constructor(
    @inject('ProductRepository')
    private repository: ProductRepository,
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
      throw new AppError(`Not found!`);
    }

    const existsData = await this.repository.findByName(name);

    if ((existsData && !id) || (existsData && `${existsData.id}` !== `${id}`)) {
      throw new AppError(
        `This is ${existsData?.name} record is already being used`,
        422,
      );
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
