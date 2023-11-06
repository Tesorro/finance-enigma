import { CSSProperties, FC, useMemo } from 'react';

import { classNames, Mods } from '../../lib/classNames/classNames';

import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar:FC<AvatarProps> = (props) => {
  const {
    className, src, alt, size,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size]);

  const mods: Mods = {};
  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.avatar, mods, [className])}
    />
  );
};
