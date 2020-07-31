import express from 'express';
import morgan from 'morgan';
import nextApp from 'next';

import env from './env';

import {createDatabaseConnection} from './db';
import logger from './util/logger';
import routes from './routes';

const {isDev} = env;
const app = nextApp({dir: './client', dev: isDev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.set('port', env.PORT);
  server.use(express.json());
  server.use(express.urlencoded({extended: true}));

  // Logger
  server.use(
    morgan('[:method] :url :status :res[content-length] - :response-time ms', {
      stream: {
        write: (text: string): void => {
          logger.info(text.substring(0, text.lastIndexOf('\n')));
        },
      },
    })
  );

  server.use('/api/v1', routes);

  // Handle everything else with Next.js
  server.get('*', (req, res) => handle(req, res));

  // Connect to the database & then start express
  createDatabaseConnection()
    .then(async (_conn) => {
      // Do database migrations(use CLI instead)
      // await _conn.runMigrations();

      server.listen(server.get('port'), () => {
        logger.info(
          `Express is running at http://localhost:${server.get(
            'port'
          )} in ${server.get('env')} mode`
        );
      });
    })
    .catch((err) => {
      logger.error(`Error while connecting to the database: ${err}`);
    });
});
