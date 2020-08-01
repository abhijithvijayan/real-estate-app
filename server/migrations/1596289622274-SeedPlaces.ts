import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';

import {CitySeed, CountrySeed, StateSeed} from '../seeds/location.seed';
import {Country} from '../models/Country';
import {State} from '../models/State';
import {City} from '../models/City';

export class SeedPlaces1596289622274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed locations into table
    await getRepository(City).save(CitySeed);
    await getRepository(State).save(StateSeed);
    await getRepository(Country).save(CountrySeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
