import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductSku from './ProductSku';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => ProductSku, skus => skus.product, {
    cascade: true,
  })
  skus!: ProductSku[];

  @Column({ type: 'varchar', length: 20 })
  sku!: string;

  @Column({ type: 'varchar', length: 155 })
  name!: string;

  @Column('decimal')
  price!: number;

  @Column('int')
  quantity!: number;

  @Column({ type: 'text' })
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
