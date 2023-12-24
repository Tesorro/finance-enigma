import { CSSProperties, FC, useMemo } from 'react';

import UserIcon from '../../assets/icons/user-filled.svg';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean;
}

export const Avatar:FC<AvatarProps> = (props) => {
  const {
    className, src, alt, size = 100, fallbackInverted,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  const mods: Mods = {};

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon Svg={UserIcon} width={size} height={size} inverted={fallbackInverted} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.avatar, mods, [className])}
    />
  );
};
