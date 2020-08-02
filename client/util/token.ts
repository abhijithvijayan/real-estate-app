import {parseCookies, setCookie, destroyCookie} from 'nookies';
import decode from 'jwt-decode';

enum Expiry {
  COOKIE_EXPIRY = 7 * 24 * 60 * 60,
}

export function saveToken(
  jwt: string,
  expires = Expiry.COOKIE_EXPIRY as number
): unknown {
  return setCookie(null, 'token', jwt, {
    maxAge: expires,
    path: '/',
  });
}

// From client only (https://www.npmjs.com/package/nookies#client-only-cookies)
export function getToken(): string {
  const cookies = parseCookies();

  return cookies.token;
}

export function removeToken(): unknown {
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
