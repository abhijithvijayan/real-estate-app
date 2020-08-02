import {action, Action, thunk, Thunk, computed, Computed} from 'easy-peasy';

import {decodeToken, saveToken, DecodedTokenPayload} from '../util/token';
import {AuthApiRoutes} from '../api/constants';
import api from '../api';

type AuthUserProps = {
  email: string;
  password: string;
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
  logout: Action<Auth>;
  login: Thunk<Auth, AuthUserProps>;
}

export const auth: Auth = {
  email: null,
  isAuthenticated: computed((s) => !!s.email),

  set: action((state, payload) => {
    state.email = payload.email;
  }),

  logout: action((state) => {
    state.email = null;
  }),

  login: thunk(
    async (actions, payload): Promise<void> => {
      // API call
      const {data: response}: AuthSuccessResponse = await api({
        key: AuthApiRoutes.LOGIN,
        params: payload,
      });

      const {status, token} = response;

      if (status) {
        // Save jwt to cookie
        saveToken(token);
        // decode token and authenticate
        const decoded: DecodedTokenPayload | null = decodeToken(token);

        if (decoded) {
          actions.set(decoded);
        }
      }
    }
  ),
};
