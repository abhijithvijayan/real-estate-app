import {Router} from 'express';

const router = Router();

router.get('/', (): void => {
  console.log('/api/v1/auth');
});

export default router;
