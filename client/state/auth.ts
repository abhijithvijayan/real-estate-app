import {action, Action, thunk, Thunk, computed, Computed} from 'easy-peasy';

import {
  decodeToken,
  saveToken,
  removeToken,
  DecodedTokenPayload,
} from '../util/token';
import {AuthApiRoutes} from '../api/constants';
import api from '../api';

type AuthUserProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  email: string;
  password: string;
  role: number;
};

type AuthSuccessResponse = {
  data: {
    status: true;
    token: string;
    message: string;
  };
};

export interface Auth {
  email: string | null;
  isAuthenticated: Computed<Auth, boolean>;
  set: Action<Auth, DecodedTokenPayload>;
  decodeAndSetToken: Action<Auth, {token: string}>;
  logout: Action<Auth>;
  signup: Thunk<Auth, SignUpProps>;
  signin: Thunk<Auth, AuthUserProps>;
}

export const auth: Auth = {
  email: null,
  isAuthenticated: computed((s) => !!s.email),

  set: action((state, payload) => {
    state.email = payload.email;
  }),

  logout: action((state) => {
    removeToken();
    state.email = null;
  }),

  decodeAndSetToken: action((state, payload) => {
    const {token} = payload;
    // Save jwt to cookie
    saveToken(token);
    // decode token and authenticate
    const decoded: DecodedTokenPayload | null = decodeToken(token);

    if (decoded) {
      state.email = decoded.email;
    }
  }),

  signup: thunk(
    async (actions, payload): Promise<void> => {
      // API call
      const {data: response}: AuthSuccessResponse = await api({
        key: AuthApiRoutes.SIGN_UP,
        params: payload,
      });

      const {status, token} = response;

      if (status) {
        actions.decodeAndSetToken({token});
      }
    }
  ),

  signin: thunk(
    async (actions, payload): Promise<void> => {
      // API call
      const {data: response}: AuthSuccessResponse = await api({
        key: AuthApiRoutes.SIGN_IN,
        params: payload,
      });

      const {status, token} = response;

      if (status) {
        actions.decodeAndSetToken({token});
      }
    }
  ),
};
