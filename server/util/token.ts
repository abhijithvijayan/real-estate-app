import JWT from 'jsonwebtoken';
import {Response} from 'express';

import {User} from '../models/User';

import {addDays} from './date';
import env from '../env';

export interface JwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

export function signJwtToken(
  user: User,
  callback: (err: null | Error, token?: string) => Response<any>
): void {
  // Sign asynchronously
  // https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
  return JWT.sign(
    {
      iss: 'ApiAuth',
      sub: user.email,
      iat: parseInt((new Date().getTime() / 1000).toFixed(0)),
      exp: parseInt((addDays(new Date(), 7).getTime() / 1000).toFixed(0)),
    } as JwtPayload,
    env.JWT_SECRET,
    (err, token) => {
      if (err) {
        callback(err);

        return;
      }

      callback(null, token);
    }
  );
}
