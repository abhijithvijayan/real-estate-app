import express from 'express';
import morgan from 'morgan';
import nextApp from 'next';

import env from './env';

const port = env.PORT;
const {isDev} = env;
const app = nextApp({dir: './client', dev: isDev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (isDev) {
    server.use(morgan('dev'));
  }

  server.use(express.json());
  server.use(express.urlencoded({extended: true}));

  server.get('/test', (_req, res) => res.json({status: 'hello world'}));

  // Handle everything else with Next.js
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
