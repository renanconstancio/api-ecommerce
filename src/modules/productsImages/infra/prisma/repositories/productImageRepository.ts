import { prisma } from '@shared/infra/prisma';
import { dateString } from '@shared/utils/functions';
import { ProductImageDTOs } from '@modules/productsImages/dtos/productImageDTOs';
import { IProductImageRepository } from '../../interfaces/IProductImageRepository';

export default class ProductImageRepository implements IProductImageRepository {
  async save(data: ProductImageDTOs): Promise<ProductImageDTOs> {
    const newData = {
      image: data.image,
      position: data.position,
      product_sku_id: data.product_sku_id,
    };

    return await prisma.productsImages
      .create({
        data: newData,
      })
      .then(({ ...image }) => ({
        ...image,
        created_at: dateString(image.created_at as Date),
        updated_at: dateString(image.updated_at as Date),
        deleted_at: image.deleted_at && dateString(image.deleted_at),
      }));
  }

  async findById(id: string): Promise<{ id: string } | null> {
    return await prisma.productsImages.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      select: {
        id: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.productsImages.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }
}
