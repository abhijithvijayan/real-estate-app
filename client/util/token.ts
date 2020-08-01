import decode from 'jwt-decode';
import cookie from 'js-cookie';

export function saveToken(jwt: string, expires = 7): string | undefined {
  return cookie.set('token', jwt, {expires});
}

export function getToken(): string | undefined {
  return cookie.get('token');
}

export function removeToken(): void {
  return cookie.remove('token');
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
