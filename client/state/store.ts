import {
  createTypedHooks,
  EasyPeasyConfig,
  createStore,
  action,
  Action,
  Store,
} from 'easy-peasy';

import {Auth, auth} from './auth';

export type StoreModelProps = {
  auth: Auth;
  reset: Action;
};

const model: StoreModelProps = {
  auth,
  reset: action(() => {}),
};

// Provide our model to the helper
const typedHooks = createTypedHooks<StoreModelProps>();

// export the typed hooks
export const {useStoreActions} = typedHooks;
export const {useStoreDispatch} = typedHooks;
export const {useStoreState} = typedHooks;

export const initializeStore = (
  initialState?: StoreModelProps
): Store<StoreModelProps, EasyPeasyConfig<StoreModelProps, any>> => {
  return createStore(model, {initialState});
};
