import React, { FC, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { NotificationList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo((props) => {
  const { className } = props;
  const trigger = (
    <Button theme={ButtonTheme.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );
  return (
    <Popover className={classNames(cls.notificationButton, {}, [className])} direction="bottom left" trigger={trigger}>
      <NotificationList className={cls.notifications} />
    </Popover>
  );
});
