import {parseCookies, setCookie, destroyCookie} from 'nookies';
import decode from 'jwt-decode';

enum Expiry {
  COOKIE_EXPIRY = 30 * 24 * 60 * 60,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function saveToken(
  jwt: string,
  expires = Expiry.COOKIE_EXPIRY as number
) {
  // return cookie.set('token', jwt, {expires, sameSite: 'Lax'});
  return setCookie(null, 'fromClient', jwt, {
    maxAge: expires,
    path: '/',
  });
}

export function getToken(): string {
  const cookies = parseCookies();
  return cookies.token;
}

export function removeToken(): {} {
  return destroyCookie(null, 'token');
}

type TokenPayload = {
  iss: 'ApiAuth';
  sub: string;
  iat: number;
  exp: number;
};

export type DecodedTokenPayload = {
  email: string;
};

export function decodeToken(token: string): null | DecodedTokenPayload {
  try {
    const {sub}: TokenPayload = decode(token);

    return {
      email: sub,
    };
  } catch {
    // Invalid Token
    return null;
  }
}
