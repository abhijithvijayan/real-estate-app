/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import {ZipCode} from './ZipCode';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 96, nullable: false})
  street: string;

  @Column()
  type: string;

  // Address can have only one ZipCode
  @ManyToOne((type) => ZipCode, (zipCode) => zipCode.addresses)
  zipCode: ZipCode;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
