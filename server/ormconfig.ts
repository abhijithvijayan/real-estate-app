import {ConnectionOptions} from 'typeorm';

import env from './env';

/**
 *  Uses `ts-node` to transpile this config to CommonJS
 *  As of now, ORM config file cannot be a TS file
 *  Related: https://github.com/typeorm/typeorm/issues/2828
 *
 *  Seeding fails => Transaction issue while migration running:
 *  Related: https://github.com/typeorm/typeorm/issues/2693
 */

const config: ConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.TYPEORM_SYNCHRONIZE, // Disable this in production
  logging: env.TYPEORM_LOGGING,
  entities: ['production-server/models/**/*{.ts,.js}'],
  migrations: ['production-server/migrations/**/*{.ts,.js}'],
  // subscribers: ['production-server/subscribers/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'server/models',
    migrationsDir: 'server/migrations',
    // subscribersDir: 'server/subscribers',
  },
};

export = config;
