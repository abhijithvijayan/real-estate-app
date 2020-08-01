import {action, Action, thunk, Thunk, computed, Computed} from 'easy-peasy';

import {
  decodeToken,
  saveToken,
  removeToken,
  DecodedTokenPayload,
} from '../util/token';

export interface Auth {
  email: string | null;
  isAuthenticated: Computed<Auth, boolean>;
  set: Action<Auth, DecodedTokenPayload>;
  logout: Action<Auth>;
  login: Thunk<Auth, {email: string; password: string}>;
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

  login: thunk(async (actions, _payload) => {
    // API call

    const token = '';
    const success = true;

    if (success) {
      // Save jwt to cookie
      saveToken(token);
      // decode token and authenticate
      const decoded: DecodedTokenPayload | null = decodeToken(token);

      if (decoded) {
        actions.set(decoded);
      }
    }

    return {};
  }),
};
