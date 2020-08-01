import asyncHandler from 'express-async-handler';
import {Router} from 'express';

import PropertyController from '../controllers/PropertyController';
import * as AuthController from '../controllers/AuthController';

const router = Router();

router.post(
  '/listing/create',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(AuthController.isSeller),
  asyncHandler(PropertyController.createListing)
);

export default router;
