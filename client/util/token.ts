import {parseCookies, setCookie} from 'nookies';
import {IncomingMessage} from 'http';
import decode from 'jwt-decode';

enum Cookie {
  TOKEN = 'token',
  PATH = '/',
}

export function saveToken(jwt: string, expires = 7 * 24 * 60 * 60): unknown {
  return setCookie(null, Cookie.TOKEN, jwt, {
    maxAge: expires,
    path: Cookie.PATH,
  });
}

export function removeToken(): string {
  return (document.cookie = `${Cookie.TOKEN}=; Path=${Cookie.PATH}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
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
