import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { useDispatch } from 'react-redux';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialStore?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
  };
  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialStore,
  });
}

const storeInstance = createReduxStore();

export type RootState = ReturnType<typeof storeInstance.getState>
export type AppDispatch = typeof storeInstance.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
