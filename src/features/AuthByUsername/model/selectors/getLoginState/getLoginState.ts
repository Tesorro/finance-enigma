import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthUsername = (state: StateSchema) => state?.loginForm.username;
export const getAuthPassword = (state: StateSchema) => state?.loginForm.password;
export const getAuthIsLoading = (state: StateSchema) => state?.loginForm.isLoading;
export const getAuthError = (state: StateSchema) => state?.loginForm?.error;
