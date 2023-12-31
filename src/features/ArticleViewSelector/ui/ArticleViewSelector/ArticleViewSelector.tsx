import { FC, memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/bi_list.svg';
import TiledIcon from '@/shared/assets/icons/fe_tiled.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    Icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    Icon: ListIcon,
  },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo((props) => {
  const { className, view, onViewClick } = props;
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };
  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button onClick={onClick(viewType.view)} theme={ButtonTheme.CLEAR} key={viewType.view}>
          <Icon Svg={viewType.Icon} className={classNames('', { [cls.notSelected]: viewType.view !== view })} />
        </Button>
      ))}
    </div>
  );
});
