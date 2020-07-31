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
 *  User (OneToOne) -> UserFavourite (OneToMany) -> Property
 */

@Entity()
export class UserFavourite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => Property, (property) => property.favourite)
  properties: Property[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
