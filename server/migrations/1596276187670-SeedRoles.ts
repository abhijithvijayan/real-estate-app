import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';

import {RolesSeed} from '../seeds/roles.seed';
import {Role} from '../models/Role';

export class SeedRoles1596276187670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed roles into table
    await getRepository(Role).save(RolesSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
