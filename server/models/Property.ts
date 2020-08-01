/* eslint-disable import/no-cycle, @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

import {UserFavourite} from './UserFavourite';
import {UserListing} from './UserListing';
import {Address} from './Address';

/**
 *  Property (OneToOne)  -> Address
 *  Property (ManyToOne) -> UserListing
 *  Property (ManyToOne) -> UserFavourite
 */

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'decimal'})
  squareMeter: number;

  @Column({length: 180})
  shortDescription: string;

  @Column({length: 400})
  longDescription: string;

  @Column({type: 'integer'})
  noOfRooms: number;

  @Column({type: 'integer'})
  noOfBedRooms: number;

  @Column({type: 'integer'})
  noOfBathRooms: number;

  // OneToOne relationship to Address
  @OneToOne((type) => Address)
  @JoinColumn()
  address: Address;

  // ManyToOne relationship to user(seller listing list)
  @ManyToOne((type) => UserListing, (listing) => listing.properties)
  listing: Promise<UserListing>;

  // ManyToMany relationship to user(buyer's / seller's favourites list)
  @ManyToMany(
    (type) => UserFavourite,
    (userFavourite) => userFavourite.properties
  )
  userFavourites: Promise<UserFavourite[]>; // lazy loaded

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
