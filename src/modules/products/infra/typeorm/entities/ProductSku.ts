// import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from './Product';
import ProductImage from './ProductImage';

@Entity('products_skus')
export default class ProductSku {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, product => product.skus)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => ProductImage, imgs => imgs.isku, {
    cascade: true,
  })
  images!: ProductSku[];

  @Column({ type: 'varchar', length: 36, nullable: true })
  product_id!: string;

  @Column({ type: 'varchar', length: 20 })
  sku!: string;

  @Column({ type: 'decimal', default: 0 })
  cost_price!: number;

  @Column({ type: 'decimal', default: 0 })
  sale_price!: number;

  @Column({ type: 'decimal', default: 0 })
  price!: number;

  @Column({ type: 'int', default: 0 })
  quantity!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
