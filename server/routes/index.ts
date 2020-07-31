import {Router} from 'express';

import auth from './auth';

const router = Router();

router.get('/', (_req, res) => {
  return res.json({status: 'API running'});
});

router.use('/auth', auth);

export default router;
