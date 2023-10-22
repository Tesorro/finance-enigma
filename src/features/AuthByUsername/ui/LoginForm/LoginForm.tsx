import { FC, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/providers/StoreProvider/config/store';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
  getAuthError,
  getAuthIsLoading,
  getAuthPassword,
  getAuthUsername,
} from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm:FC<LoginFormProps> = memo((props) => {
  const { className } = props;
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
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);
  return (
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
  );
});
