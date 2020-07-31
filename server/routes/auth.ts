import asyncHandler from 'express-async-handler';
import {Router} from 'express';

import * as AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/signup', asyncHandler(UserController.signup));
router.post(
  '/signin',
  asyncHandler(AuthController.localAuth),
  AuthController.signToken
);
router.post(
  '/test-jwt-auth',
  asyncHandler(AuthController.jwtAuth),
  (req, res) => res.send({status: true})
);

export default router;
