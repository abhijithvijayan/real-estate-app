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
  '/user/listing',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.getUserListings)
);

router.get(
  '/listing',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.getAllPropertyListings)
);

// Get user's favourite properties' ids
router.get(
  '/listing/favourites/ids',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.getFavouritesIdCollection)
);

// Get favourite collection with properties
router.get(
  '/listing/favourites/all',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.getFavourites)
);

// Add or remove item to user favourites collection
router.post(
  '/listing/favourites',
  asyncHandler(AuthController.jwtAuth),
  asyncHandler(PropertyController.addOrRemoveFromFavourites)
);

export default router;
