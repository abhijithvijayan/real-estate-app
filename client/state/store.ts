import {
  createStore,
  createTypedHooks,
  Store,
  EasyPeasyConfig,
} from 'easy-peasy';

export type StoreModelProps = {};

const model: StoreModelProps = {};

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
