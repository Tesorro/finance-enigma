import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { useDispatch } from 'react-redux';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialStore?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialStore,
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

const storeInstance = createReduxStore();

export type RootState = ReturnType<typeof storeInstance.getState>
export type AppDispatch = typeof storeInstance.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
