import passport from 'passport';
import {Request, Response, NextFunction, Handler} from 'express';

/**
 *  Custom Callback for Passport auth
 *  https://www.passportjs.org/docs/authenticate/
 */
const authenticate = (strategy: 'local', error: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function auth(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate(strategy, (err, user, _info) => {
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
