import {
  createStore,
  createTypedHooks,
  Store,
  EasyPeasyConfig,
} from 'easy-peasy';

import {Auth, auth} from './auth';

export type StoreModelProps = {
  auth: Auth;
};

const model: StoreModelProps = {
  auth,
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
