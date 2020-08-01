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

router.get(
  '/listing',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.getListings)
);

router.post(
  '/listing/favourites',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.addOrRemoveFromFavourites)
);

export default router;
