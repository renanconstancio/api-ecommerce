// import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductSku from './ProductSku';

@Entity('products_images', { orderBy: { position: 'ASC' } })
export default class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id!: string;

  @ManyToOne(() => ProductSku, product => product.images)
  @JoinColumn({ name: 'product_sku_id' })
  isku: ProductSku;

  @Column({ type: 'varchar', length: 36, nullable: true })
  @Exclude()
  product_sku_id!: string;

  @Column({ type: 'varchar', length: 42 })
  @Exclude()
  image!: string;

  @Column({ type: 'int', default: 0 })
  @Exclude()
  position!: number;

  @CreateDateColumn()
  @Exclude()
  created_at!: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at!: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at!: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    return `${process.env.BASE_AVATAR_URL}/images/${this.image}`;
  }
}
