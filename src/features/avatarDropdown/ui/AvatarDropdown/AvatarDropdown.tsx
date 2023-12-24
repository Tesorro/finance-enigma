import React, { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames(cls.avatarDropdown, {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable ? [{
          content: 'Админка',
          href: getRouteAdminPanel(),
        }] : []),
        {
          content: 'Профиль',
          href: getRouteProfile(authData.id),
        },
        {
          content: 'Выйти',
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} fallbackInverted />}
    />
  );
});
