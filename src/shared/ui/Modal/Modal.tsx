import React, {
  FC, useCallback, useEffect, useState,
} from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal:FC<ModalProps> = (props) => {
  const {
    className, children, isOpen, onClose, lazy,
  } = props;

  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const closeHandler = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeHandler();
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  if (lazy && !isMounted) return null;

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className, theme, 'app_modal'])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>

  );
};
