import {cleanEnv, num, str, bool} from 'envalid';

const env = cleanEnv(process.env, {
  PORT: num({default: 3000}),
  DB_HOST: str({default: 'localhost'}),
  DB_PORT: num({default: 5432}),
  DB_NAME: str({default: 'postgres'}),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_SSL: bool({default: false}),
  DB_POOL_MIN: num({default: 2}),
  DB_POOL_MAX: num({default: 10}),
  JWT_SECRET: str(),
});

export default env;
