/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Entity,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import {Property} from './Property';

/**
 *  User (OneToOne) -> UserListing (OneToMany) -> Property
 */

@Entity()
export class UserListing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => Property, (property) => property.listing)
  properties: Promise<Property[]>;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
