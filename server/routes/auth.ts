import asyncHandler from 'express-async-handler';
import {Router} from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.post('/signup', asyncHandler(UserController.signup));

export default router;
