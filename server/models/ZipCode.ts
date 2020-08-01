/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Entity,
} from 'typeorm';

import {Address} from './Address';
import {Country} from './Country';
import {State} from './State';
import {City} from './City';

@Entity()
export class ZipCode {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // ZipCode can have multiple addresses
  @OneToMany((type) => Address, (address) => address.zipCode)
  addresses: Address[];

  // ZipCode can have multiple addresses
  @OneToMany((type) => Country, (country) => country.zipCode)
  countries: Country[];

  // ZipCode can have multiple addresses
  @OneToMany((type) => State, (state) => state.zipCode)
  states: State[];

  // ZipCode can have multiple addresses
  @OneToMany((type) => City, (city) => city.zipCode)
  cities: City[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
