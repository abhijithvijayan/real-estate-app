import {cleanEnv, num, str, bool} from 'envalid';

const env = cleanEnv(process.env, {
  PORT: num({default: 3000}),
  DB_HOST: str({default: 'localhost'}),
  DB_PORT: num({default: 5432}),
  DB_NAME: str({default: 'postgres'}),
  DB_USER: str(),
  DB_PASSWORD: str(),
  TYPEORM_SYNCHRONIZE: bool({default: true}),
  TYPEORM_LOGGING: bool({default: false}),
  JWT_SECRET: str(),
});

export default env;
