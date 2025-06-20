import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryOrm } from '../../categories/infrastructure/category-orm.entity';

@Entity('products')
export class ProductOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoryOrm, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryOrm;

  @Column({ name: 'has_expiration' })
  hasExpiration: boolean;

  @Column()
  image: string;

  @OneToMany(() => ProductPriceOrm, (pp) => pp.product, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  prices: ProductPriceOrm[];
}

@Entity('product_prices')
export class ProductPriceOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'price_type' })
  priceType: string;

  @Column({ name: 'minimum_quantity' })
  minimumQuantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => ProductOrm, (product) => product.prices, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductOrm;
}
