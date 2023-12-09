import {
  FC, memo, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo((props) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));
  useInfiniteScroll({
    wrapperRef, triggerRef, callback: onScrollEnd,
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({
      path: pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 1500);

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  return (
    <section onScroll={onScroll} ref={wrapperRef} className={classNames(cls.page, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
