/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

import {ZipCode} from './ZipCode';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 96, nullable: false})
  street: string;

  @Column()
  type: string;

  @OneToOne((type) => ZipCode)
  @JoinColumn()
  zipCode: ZipCode;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
