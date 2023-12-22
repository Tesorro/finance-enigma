import React, {
  FC, memo, useCallback, useState,
} from 'react';

import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';

import { NotificationList } from '@/entities/Notification';
import { Popover } from '@/shared/ui/Popups';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo((props) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button onClick={handleOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );
  return (
    <div>
      <BrowserView>
        <Popover className={classNames(cls.notificationButton, {}, [className])} direction="bottom left" trigger={trigger}>
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={handleCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
