/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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

  // ManyToOne relationship to Property
  @ManyToMany((type) => Property, (property) => property.userFavourites)
  @JoinTable()
  properties: Promise<Property[]>; // lazy loaded

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
