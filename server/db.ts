import {createConnection, Connection} from 'typeorm';

import * as config from './ormconfig';

export function createDatabaseConnection(): Promise<Connection> {
  return createConnection(config);
}
