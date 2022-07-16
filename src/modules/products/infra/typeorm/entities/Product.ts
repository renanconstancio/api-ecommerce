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

  @Column({ type: 'varchar', length: 155 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  keywords!: string;

  @Column({ type: 'varchar', length: 505 })
  description!: string;

  @Column({
    type: 'enum',
    enum: ['visible', 'invisible'],
    default: 'invisible',
  })
  visible!: string;

  @Column({ type: 'text', nullable: true })
  description_text!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
