import asyncHandler from 'express-async-handler';
import {Router} from 'express';

import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/signup', asyncHandler(AuthController.signup));

export default router;
