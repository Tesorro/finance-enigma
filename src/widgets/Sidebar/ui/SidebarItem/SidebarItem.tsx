import { FC } from 'react';
import { useSelector } from 'react-redux';

import { ISidebarItem } from '../../model/types/sidebar';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: ISidebarItem;
  collapsed: boolean;
}

export const SidebarItem:FC<SidebarItemProps> = (props) => {
  const { collapsed, item } = props;
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }
  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>
        {item.title}
      </span>
    </AppLink>
  );
};
