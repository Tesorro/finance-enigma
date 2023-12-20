import {
  FC, memo, useCallback,
} from 'react';

import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';

import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
  getAuthError,
  getAuthIsLoading,
  getAuthPassword,
  getAuthUsername,
} from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm:FC<LoginFormProps> = memo((props) => {
  const { className, onSuccess } = props;
  const dispatch = useAppDispatch();
  const username = useSelector(getAuthUsername);
  const password = useSelector(getAuthPassword);
  const error = useSelector(getAuthError);
  const isLoading = useSelector(getAuthIsLoading);

  const onChangeUsername = useCallback((value) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);
  const onChangePassword = useCallback((value) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);
  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, password, username, onSuccess]);
  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.loginForm, {}, [className])}>
        <Text title="Форма авторизации" />
        {error && <Text text={error} theme={TextTheme.ERROR} />}
        <Input
          value={username}
          onChange={onChangeUsername}
          type="text"
          className={cls.input}
          placeholder="Введите логин"
          autofocus
        />
        <Input
          value={password}
          onChange={onChangePassword}
          type="text"
          className={cls.input}
          placeholder="Введите пароль"
        />
        <Button
          className={cls.loginBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          Войти
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});
export default LoginForm;
