/* eslint-disable import/no-cycle, @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
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

  // ManyToOne relationship to user(seller listing)
  @ManyToOne((type) => UserListing, (listing) => listing.properties)
  listing: Promise<UserListing>;

  // Todo: many to many?
  // ManyToOne relationship to user(buyer favourites)
  @ManyToOne((type) => UserFavourite, (favourite) => favourite.properties)
  favourite: UserFavourite;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
