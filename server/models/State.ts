/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['code', 'name'])
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable: false})
  code: string;

  @Column({length: 64, nullable: false})
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
