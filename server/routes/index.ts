import {Router} from 'express';

import property from './property';
import auth from './auth';

const router = Router();

router.get('/', (_req, res) => {
  return res.json({status: 'API running'});
});

router.use('/auth', auth);
router.use('/property', property);

export default router;
