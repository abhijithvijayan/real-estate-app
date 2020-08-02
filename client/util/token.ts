import {parseCookies, setCookie} from 'nookies';
import {IncomingMessage} from 'http';
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

// From server only
export function getCookieFromReq(req?: IncomingMessage): string | null {
  if (req) {
    const cookie = req?.headers?.cookie
      ?.split(';')
      ?.find((c) => c.trim().startsWith('token='));

    if (!cookie) {
      return null;
    }

    return cookie.split('=')[1];
  }

  return null;
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
