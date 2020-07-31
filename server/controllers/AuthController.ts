import {Request, Response, NextFunction, Handler} from 'express';
import {getRepository} from 'typeorm';
import passport from 'passport';

import {Role, UserRole} from '../models/Role';
import {User} from '../models/User';

import * as utils from '../util/token';

/**
 *  Custom Callback for Passport auth
 *  https://www.passportjs.org/docs/authenticate/
 */
const authenticate = (strategy: 'local' | 'jwt', error: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function auth(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate(strategy, (err, user: User, _info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        throw new Error(error);
      }

      req.user = {
        ...user,
        // Todo: attach admin flag
      };

      return next();
    })(req, res, next);
  };
};

export const localAuth: Handler = authenticate(
  'local',
  'Email or password is wrong.'
);
export const jwtAuth: Handler = authenticate('jwt', 'Unauthorized');

export const signToken = (
  req: Request,
  res: Response
): Response<any> | void => {
  if (req.user) {
    utils.signJwtToken(
      req.user as User,
      (err: null | Error, token?: string): Response<any> => {
        if (err) {
          return res.status(500).send(err);
        }

        if (token === undefined) {
          return res.status(500).send('Token signing failed');
        }

        return res.status(200).send({token});
      }
    );

    return;
  }

  // eslint-disable-next-line consistent-return
  return res.status(500).send('Token signing failed');
};

export const hasRequiredRoles = (requiredRoles: string[], error: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any>> => {
    const currentUser = req.user as User | undefined;

    if (currentUser === undefined) {
      return res.status(401).send('No such user');
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({
        relations: ['roles'],
        where: {id: currentUser.id},
      });
    } catch (err) {
      return res.status(401).send(err);
    }

    const currentRoles: Role[] = user.roles;
    if (currentRoles.some((item) => requiredRoles.includes(item.name))) {
      return next();
    }

    return res.status(401).send(error);
  };
};

export const isAdmin = hasRequiredRoles(
  [UserRole.ADMIN],
  'Must be an administrator to perform this action'
);
export const isBuyer = hasRequiredRoles(
  [UserRole.BUYER],
  'Must be a buyer to perform this action'
);
export const isSeller = hasRequiredRoles(
  [UserRole.SELLER],
  'Must be a seller to perform this action'
);
export const canCreateListing = hasRequiredRoles(
  [UserRole.ADMIN, UserRole.AGENT, UserRole.SELLER],
  'Must have special privileges to perform this action'
);
